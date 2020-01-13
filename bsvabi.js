const Validators = require('./src/validators');
const Transaction = require('./src/transaction');
const Promise = require('bluebird');

class BSVABI {
	constructor(abi, options = {}) {
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
		const transaction = Transaction.decodeTx(tx);
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

	async replace() {
		const replacements = {
			'#{mySignature}': async index => {
				if (this.options.sign) {
					const value = this.args
						.slice(
							this.action.args[index].messageStartIndex || 0,
							this.action.args[index].messageEndIndex + 1 || index - 1
						)
						.join(' ');

					const sig = await this.options.sign(value);
					this.args[index] = sig;
				}
			},
			'#{myAddress}': async index => {
				if (this.options.address) {
					const address = await this.options.address();
					this.args[index] = address;
				}
			}
		};

		await Promise.map(
			this.args,
			(e, i) => {
				if (this.action.args[i].replaceValue === e) {
					const replacement = replacements[e];
					if (replacement) {
						return replacement(i);
					}
				}
			},
			{ concurrency: 1 }
		);

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
