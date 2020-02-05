const Message = require('../bsv/message');
const Hash = require('../bsv/lib/crypto/hash');

class Signature {
	static verify(message, address, signature) {
		return Message.verify(message, address, signature);
	}

	static sha256(message) {
		return Hash.sha256(Buffer.from(message)).toString('hex');
	}
}

module.exports = Signature;
