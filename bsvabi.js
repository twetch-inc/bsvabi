const Validators = require('./src/validators');
const Transaction = require('./src/transaction');

class BSVABI {
	constructor(abi) {
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
			.map((e, i) => ({ ...e, value: this.args[i] }))
			.reduce((a, e) => Object.assign(a, { [e.name]: e.value }), {});
	}

	replace(key, value) {
		this.args = this.args.map((e, i) => {
			if (this.action.args[i].replaceValue === key) {
				return value;
			}

			return e;
		});

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
