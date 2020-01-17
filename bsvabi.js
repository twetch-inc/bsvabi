const Validators = require('./src/validators');
const Transaction = require('./src/transaction');
const Signature = require('./src/signature');

class BSVABI {
	constructor(abi, options = {}) {
		this.network = options.network || 'mainnet';
		this.options = options;
		this.abi = abi;
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
			(e, i) => object[e.name] || e.value || e.replaceValue || e.defaultValue
		);
		this.validate();
		return this;
	}

	fromTx(tx) {
		const transaction = Transaction.decodeTx(tx, this.network);
		this.decodedTx = transaction;
		this.args = transaction.vout.find(e => e.scriptPubKey.opReturn).scriptPubKey.opReturn.parts;
		this.validate();
		return this;
	}

	fromArgs(args) {
		this.args = args;
		this.validate();
		return this;
	}

	toArray() {
		return this.args;
	}

	toObject() {
		return this.action.args
			.map((e, i) => ({ ...e, value: this.args[i] === 'null' ? null : this.args[i] }))
			.reduce((a, e) => Object.assign(a, { [e.name]: e.value }), {});
	}

	contentHash(index) {
		let arg = this.action.args[index];
		if (!arg) {
			arg = this.action.args.find(e => e.type === 'Signature');
		}
		const value = this.args
			.slice(arg.messageStartIndex || 0, arg.messageEndIndex + 1 || index - 1)
			.join(' ');
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
