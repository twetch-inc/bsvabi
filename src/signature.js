const Message = require('bsv/Message');
const bsv = require('bsv');

class Signature {
	static verify(message, address, signature) {
		return Message.verify(message, address, signature);
	}

	static sha256Verify(message, address, signature) {
		message = Signature.sha256(message);
		return Message.verify(message, address, signature);
	}

	static sha256(message) {
		return bsv.crypto.Hash.sha256(Buffer.from(message)).toString('hex');
	}
}

module.exports = Signature;
