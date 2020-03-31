const _Buffer = require('buffer/');
const Validators = require('./src/validators');
const Transaction = require('./src/transaction');
const Signature = require('./src/signature');
const isNode = typeof window === 'undefined';

const Script = require('./bsv/lib/script');
const Opcode = require('./bsv/lib/opcode');

class BSVABI {
	constructor(abi, options = {}) {
		this.network = options.network || 'mainnet';
		this.options = options;
		this.abi = abi;
		this.args = [];

		if (options.action) {
			this.action(options.action);
		}
	}

	get fs() {
		return isNode ? eval(`require('fs')`) : {};
	}

	get path() {
		return isNode ? eval(`require('path')`) : {};
	}

	action(actionName) {
		const action = this.abi.actions[actionName];

		if (!action) {
			throw new Error('BSVABI Error: action not found in abi schema');
		}

		this.actionName = actionName;
		this.action = action;
		return this;
	}

	fromObject(object) {
		this.args = this.action.args.map(
			(e, i) => object[e.name] || this.args[i] || e.value || e.replaceValue || e.defaultValue
		);
		this.validate();
		return this;
	}

	fromFile(filepath) {
		const file = this.fs.readFileSync(filepath);
		this.args = this.action.args.map(
			(e, i) => this.args[i] || e.value || e.replaceValue || e.defaultValue
		);
		this.args[this.action.encodingIndex] = 'binary';
		this.args[this.action.contentIndex] = file;
		this.args[this.action.filenameIndex] = this.path.basename(filepath);
		this.args[this.action.contentTypeIndex] = {
			'.txt': 'text/plain',
			'.jpeg': 'image/jpeg',
			'.jpg': 'image/jpeg',
			'.png': 'image/png',
			'.gif': 'image/gif',
			'.tiff': 'image/tiff',
			'.jgd': 'image/jgd',
			'.bmp': 'image/bmp',
			'.webp': 'image/webp',
			'.mp4': 'video/mp4',
			'.mp3': 'audio/mp3'
		}[this.path.extname(filepath)];

		this.validate();
		return this;
	}

	fromTx(tx) {
		const transaction = Transaction.decodeTx(tx, this.network);
		this.decodedTx = transaction;
		const dataOutput = transaction.vout.find(e => e.scriptPubKey.opReturn);
		this.args = dataOutput.scriptPubKey.opReturn.parts;

		this.action.args.map((e, i) => {
			if (!e.encodingIndex) {
				return;
			}

			const encoding = this.args[e.encodingIndex];

			if (encoding === 'binary') {
				this.args[i] = dataOutput.scriptPubKey.opReturn.bufferParts[i];
			}
		});

		this.validate();
		return this;
	}

	fromArgs(args) {
		this.args = args;
		this.validate();
		return this;
	}

	toChunks() {
		return this.args.map(e => Buffer.from(e));
	}

	toArray() {
		return this.args;
	}

	toObject() {
		return this.action.args
			.map((e, i) => ({ ...e, value: this.args[i] === 'null' ? null : this.args[i] }))
			.reduce((a, e) => Object.assign(a, { [e.name]: e.value }), {});
	}

	toFile() {
		const path = `${__dirname}/${this.args[this.action.filenameIndex]}`;
		this.fs.writeFileSync(path, this.args[this.action.contentIndex]);
	}

	toScript() {
		let s = new Script();
		s.add(Opcode.OP_FALSE);
		s.add(Opcode.OP_RETURN);
		this.args.forEach(function(item) {
			let buffer = _Buffer.Buffer.from(item);
			s.add(buffer);
		});
		return s;
	}

	contentHash(index) {
		if (!this.action.args.length) {
			return;
		}

		let arg = this.action.args[index];
		if (!arg) {
			arg = this.action.args.find(e => e.type === 'Signature');
		}
		const value = Buffer.concat(
			this.toChunks().slice(arg.messageStartIndex || 0, arg.messageEndIndex + 1 || index - 1)
		);
		return Signature.sha256(value);
	}

	async replace(options) {
		const replacements = Object.assign(
			{
				'#{mySignature}': async index => {
					if (this.options.sign) {
						return this.options.sign(this.contentHash(index));
					}
				},
				'#{myAddress}': async index => {
					if (this.options.address) {
						return this.options.address();
					}
				},
				'#{invoice}': async index => {
					if (this.options.invoice) {
						return await this.options.invoice();
					}
				}
			},
			options
		);

		for (let i in this.args) {
			const e = this.args[i];
			if (this.action.args[i].replaceValue === e) {
				const replacement = replacements[e];
				if (replacement) {
					this.args[i] = (await replacement(i)) || e;
				}
			}
		}

		return this;
	}

	validate() {
		const errors = [];

		this.action.args.forEach((e, i) => {
			const value = this.args[i];
			const validator = Validators[e.type];

			if (!e.type) {
				return;
			}

			if (!validator) {
				return errors.push(`unsupported type '${e.type}' for argument ${e.name}: '${value}'`);
			}

			validator(value, e, errors, this.args, this.action.args, i);
		});

		if (errors.length) {
			throw new Error(errors.join('\n'));
		}
	}
}

module.exports = BSVABI;
