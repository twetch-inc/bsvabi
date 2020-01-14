const Message = require('bsv/message');
const bsv = require('bsv');

class Signature {
	static verify(message, address, signature) {
		return Message.verify(message, address, signature);
	}

	static sha256(message) {
		return bsv.crypto.Hash.sha256(Buffer.from(message)).toString('hex');
	}
}

module.exports = Signature;
