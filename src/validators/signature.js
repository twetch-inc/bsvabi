const Signature = require('../signature');

module.exports = (value, arg, errors, args, schemaArgs, index) => {
	if (value === arg.replaceValue) {
		return;
	}

	if (arg.value && value !== arg.value) {
		errors.push(`argument ${arg.name}: '${value}' does not match '${arg.value}'`);
	}

	const message = args.slice(arg.messageStartIndex, arg.messageEndIndex).join(' ');
	const address = args[arg.addressIndex];
	const signature = args[index];
	const valid = Signature.verify(message, address, signature);

	if (!valid) {
		errors.push(`argument ${arg.name}: '${value}' is not a valid signature for this content`);
	}
};
