const Address = require('../../bsv/lib/address');

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

	try {
		Address.fromString(value);
	} catch (e) {
		errors.push(`argument ${arg.name}: '${value}' does not match type '${arg.type}'`);
	}
};
