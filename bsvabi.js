const bsv = require('bsv');
const bitcoin = require('bitcoinjs-lib');

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

	decodeTx(tx) {
		const transaction = bitcoin.Transaction.fromHex(tx);

		return {
			hex: tx,
			txid: transaction.getId(),
			hash: transaction.getId(),
			version: transaction.version,
			locktime: transaction.lockTime,
			vout: transaction.outs.map((e, index) => {
				const script = bsv.Script.fromBuffer(e.script);
				const addressInfo = script.getAddressInfo();

				const response = {
					value: e.value,
					n: index,
					scriptPubKey: {
						asm: script.toASM(),
						script: script.toHex(),
						type: addressInfo.type,
						addresses: !script.isDataOut() ? [script.toAddress().toString()] : null,
						opReturn: script.isDataOut()
							? {
									parts: script.chunks.filter(e => e.buf).map(e => e.buf.toString())
							  }
							: null
					}
				};

				return response;
			})
		};
	}

	fromTx(tx) {
		const transaction = this.decodeTx(tx);
		this.args = transaction.vout.find(e => e.scriptPubKey.opReturn).scriptPubKey.opReturn.parts;
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

	validate() {
		const errors = [];

		const typeValidators = {
			String: v => typeof v === 'string',
			Address: v => {
				if (v === '#{myAddress}') {
					return true;
				}

				if (v.length !== 34) {
					return false;
				}

				try {
					bsv.encoding.Base58Check.fromString(v);
				} catch (e) {
					return false;
				}

				return true;
			},
			Signature: v => {
				if (v === '#{mySignature}') {
					return true;
				}

				// todo validate signature
				return false;
			}
		};

		this.action.args.forEach((e, i) => {
			const value = this.args[i];

			if (e.value && value !== e.value) {
				return errors.push(`argument ${e.name}: '${value}' does not match '${e.value}'`);
			}

			const validator = typeValidators[e.type];

			if (!validator) {
				return errors.push(`unsupported type '${e.type}' for argument ${e.name}: '${value}'`);
			}

			if (!validator(value)) {
				errors.push(`argument ${e.name}: '${value}' does not match type '${e.type}'`);
			}
		});

		if (errors.length) {
			throw new Error(errors.join('\n'));
		}
	}
}

module.exports = BSVABI;
