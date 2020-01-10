const bsv = require('bsv');
const bitcoin = require('bitcoinjs-lib');

class Transaction {
	static decodeTx(tx) {
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
}

module.exports = Transaction;
