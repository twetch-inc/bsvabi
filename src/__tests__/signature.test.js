const Signature = require('../signature');

const message = 'yo frawg';
const address = '13nRpHT4QXM6XJYFhXCeDjQxoJAT5EZm7R';
const signature =
	'ILPPN7Ip75qP7M67p7885ttyvzSCT8/VhEnZyqD5mOG7fVTmdzQtv6LWCOiAU+SyYp96Q9iLFcmkCfb7Ehd5x70=';
const hash = 'f46ea69189fe455b4aecafc09631e207c50718245251ad0226a25415cea87d79';

test('verify', () => {
	const response = Signature.verify(message, address, signature);
	expect(response).toBe(true);
});

test('hash', () => {
	const response = Signature.sha256(message);
	expect(response).toBe(hash);
});
