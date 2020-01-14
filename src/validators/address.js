const bsv = require('bsv');

module.exports = (value, arg, errors) => {
	if (value === arg.replaceValue) {
		return;
	}

	if (arg.value && value !== arg.value) {
		errors.push(`argument ${arg.name}: '${value}' does not match '${arg.value}'`);
	}

	if (!value) {
		errors.push(`argument ${arg.name}: '${value}' is not defined`);
		return; 
	}

	if (value.length !== 34) {
		errors.push(`argument ${arg.name}: '${value}' does not match type '${arg.type}'`);
	}

	try {
		bsv.encoding.Base58Check.fromString(value);
	} catch (e) {
		errors.push(`argument ${arg.name}: '${value}' does not match type '${arg.type}'`);
	}
};
