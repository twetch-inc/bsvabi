const Signature = require('../signature');

module.exports = (value, arg, errors, args, schemaArgs, index) => {
	if (value === arg.replaceValue) {
		return;
	}

	if (arg.value && value !== arg.value) {
		errors.push(`argument ${arg.name}: '${value}' does not match '${arg.value}'`);
	}

	const message = args.slice(arg.messageStartIndex, arg.messageEndIndex + 1).join(' ');
	const bufferMessage = Buffer.concat(
		args.slice(arg.messageStartIndex || 0, arg.messageEndIndex + 1).map(e => Buffer.from(e))
	);

	const address = args[arg.addressIndex];
	const signature = args[index];

	const bufferValid = Signature.verify(Signature.sha256(bufferMessage), address, signature);
	const stringValid = Signature.verify(Signature.sha256(message), address, signature);

	if (!bufferValid && !stringValid) {
		errors.push(`argument ${arg.name}: '${value}' is not a valid signature for this content`);
	}
};
