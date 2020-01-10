module.exports = (value, arg, errors) => {
	if (arg.value && value !== arg.value) {
		errors.push(`argument ${arg.name}: '${value}' does not match '${arg.value}'`);
	}

	if (typeof value !== 'string') {
		errors.push(`argument ${arg.name}: '${value}' does not match type '${arg.type}'`);
	}
};
