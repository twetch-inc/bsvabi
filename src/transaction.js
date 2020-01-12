const bitcoin = require('bsv');

class Transaction {
	static decodeTx(tx) {
		const transaction = bitcoin.Transaction(tx).toObject();

		return Object.assign(transaction, {
			vout: transaction.outputs.map((e, index) => {
				const script = bitcoin.Script.fromBuffer(e.script);
				const addressInfo = script.getAddressInfo();

				const response = {
					value: e.satoshis,
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
		});
	}
}

module.exports = Transaction;
