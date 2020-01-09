class BSVABI {
	constructor(abi) {
		this.abi = abi;
	}

	action(action) {
		this.action = action;

		return this;
	}

	fromTx(tx) {
		return this;
	}

	fromArgs(args) {
		return this;
	}

	toArray() {
		return [];
	}

	toObject() {
		return {};
	}
}

module.exports = BSVABI;
