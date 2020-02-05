const BSVTransaction = require('../bsv/lib/transaction');
const Script = require('../bsv/lib/script');

class Transaction {
	static decodeTx(tx, network) {
		const transaction = BSVTransaction(tx).toObject();

		return Object.assign(transaction, {
			vout: transaction.outputs.map((e, index) => {
				const script = Script.fromBuffer(e.script);
				const addressInfo = script.getAddressInfo();

				const response = {
					value: e.satoshis,
					n: index,
					scriptPubKey: {
						asm: script.toASM(),
						script: script.toHex(),
						type: addressInfo.type,
						addresses: !script.isDataOut() ? [script.toAddress(network).toString()] : null,
						opReturn:
							script.isDataOut() || script.isSafeDataOut()
								? {
										parts: script.chunks.filter(e => e.buf).map(e => e.buf.toString()),
										bufferParts: script.chunks.filter(e => e.buf).map(e => e.buf)
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
