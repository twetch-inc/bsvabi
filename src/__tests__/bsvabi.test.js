const BSVABI = require('../../bsvabi');
const rawTx =
	'01000000014d12118b272be53c8be4386bf608fc14b96821ad08c42491cb7d0223a0a2a228040000006a4730440220262983ee3c57072ac8ed011d37fc72d743673ad68ac6303d00afb93b24bc71ce02206673579b5885c1f89d2dacc018de74792c80d48f4231bc2955efcf1290f6edeb4121025bd921b65a347076b12acd346cae05d4dab57701ce077f29d3052ed72cad9c9cffffffff040000000000000000fdd801006a2231394878696756345179427633744870515663554551797131707a5a56646f41757419776f726b666c6f7773206d6f76696e67206f6e20636861696e0a746578742f706c61696e04746578741f7477657463685f7477746578745f313538363336383630313431372e747874017c223150755161374b36324d694b43747373534c4b79316b683536575755374d74555235035345540b7477646174615f6a736f6e046e756c6c0375726c046e756c6c07636f6d6d656e74046e756c6c076d625f757365720434373231057265706c79046e756c6c047479706504706f73740974696d657374616d70046e756c6c036170700674776574636807696e766f6963652436373936613732342d656361652d346633632d386663642d386432393339313666656238017c22313550636948473232534e4c514a584d6f53556157566937575371633768436676610d424954434f494e5f454344534122314856696579647345744e4d58374a76685677477437686a79716f564e7477616f744c58494c4f364b366a5a4666696767384e354e776d72725065653732767a727246503437615661715a4a386a63494731386171772f696d2f2f496d3050774368787230356a385a6733347666626e2f6b6439686b59374b42513da4200000000000001976a91405186ff0710ed004229e644c0653b2985c648a2388aca0030000000000001976a9144edee9749febb189b7b68f4c8c83c90503def31888aca64d0000000000001976a91461a47c349c5acecccd4380fd77e0b17be441fb9988ac00000000';

const abi = {
	name: 'Twetch',
	hostname: 'twetch.com',
	endpoint: 'api.twetch.app/v1/publish',
	actions: {
		'twetch/post@0.0.1': {
			type: 'post',
			contentIndex: 1,
			contentTypeIndex: 2,
			encodingIndex: 3,
			filenameIndex: 4,
			args: [
				{ name: 'bNamespace', type: 'Address', value: '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut' },
				{ name: 'bContent', encodingIndex: 3 },
				{ name: 'bContentType', type: 'String', defaultValue: 'text/plain' },
				{ name: 'bEncoding', type: 'String', defaultValue: 'text' },
				{ name: 'bFilename', type: 'String', defaultValue: 'twetch.txt' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'mapNamespace', type: 'Address', value: '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5' },
				{ name: 'mapAction', type: 'String', value: 'SET' },
				{ name: 'mapTwdataKey', type: 'String', value: 'twdata_json' },
				{ name: 'mapTwdata', type: 'String', defaultValue: 'null' },
				{ name: 'mapUrlKey', type: 'String', value: 'url' },
				{ name: 'mapUrl', type: 'String', defaultValue: 'null' },
				{ name: 'mapCommentKey', type: 'String', value: 'comment' },
				{ name: 'mapComment', type: 'String', defaultValue: 'null' },
				{ name: 'mapMbUserKey', type: 'String', value: 'mb_user' },
				{ name: 'mapMbUser', type: 'String', defaultValue: 'null' },
				{ name: 'mapReplyKey', type: 'String', defaultValue: 'reply' },
				{ name: 'mapReply', type: 'String', defaultValue: 'null' },
				{ name: 'mapTypeKey', type: 'String', value: 'type' },
				{ name: 'mapType', type: 'String', defaultValue: 'post' },
				{ name: 'mapTimestampKey', type: 'String', value: 'timestamp' },
				{ name: 'mapTimestamp', type: 'String', defaultValue: 'null' },
				{ name: 'mapAppKey', type: 'String', value: 'app' },
				{ name: 'mapApp', type: 'String', value: 'twetch' },
				{ name: 'mapInvoiceKey', type: 'String', value: 'invoice' },
				{ name: 'mapInvoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe2', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 25,
					addressIndex: 29
				}
			]
		}
	}
};

test('action', () => {
	const instance = new BSVABI(abi).action('twetch/post@0.0.1');
	expect(instance.action).toStrictEqual({
		type: 'post',
		contentIndex: 1,
		contentTypeIndex: 2,
		encodingIndex: 3,
		filenameIndex: 4,
		args: [
			{ name: 'bNamespace', type: 'Address', value: '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut' },
			{ name: 'bContent', encodingIndex: 3 },
			{ name: 'bContentType', type: 'String', defaultValue: 'text/plain' },
			{ name: 'bEncoding', type: 'String', defaultValue: 'text' },
			{ name: 'bFilename', type: 'String', defaultValue: 'twetch.txt' },
			{ name: 'pipe', type: 'String', value: '|' },
			{ name: 'mapNamespace', type: 'Address', value: '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5' },
			{ name: 'mapAction', type: 'String', value: 'SET' },
			{ name: 'mapTwdataKey', type: 'String', value: 'twdata_json' },
			{ name: 'mapTwdata', type: 'String', defaultValue: 'null' },
			{ name: 'mapUrlKey', type: 'String', value: 'url' },
			{ name: 'mapUrl', type: 'String', defaultValue: 'null' },
			{ name: 'mapCommentKey', type: 'String', value: 'comment' },
			{ name: 'mapComment', type: 'String', defaultValue: 'null' },
			{ name: 'mapMbUserKey', type: 'String', value: 'mb_user' },
			{ name: 'mapMbUser', type: 'String', defaultValue: 'null' },
			{ name: 'mapReplyKey', type: 'String', defaultValue: 'reply' },
			{ name: 'mapReply', type: 'String', defaultValue: 'null' },
			{ name: 'mapTypeKey', type: 'String', value: 'type' },
			{ name: 'mapType', type: 'String', defaultValue: 'post' },
			{ name: 'mapTimestampKey', type: 'String', value: 'timestamp' },
			{ name: 'mapTimestamp', type: 'String', defaultValue: 'null' },
			{ name: 'mapAppKey', type: 'String', value: 'app' },
			{ name: 'mapApp', type: 'String', value: 'twetch' },
			{ name: 'mapInvoiceKey', type: 'String', value: 'invoice' },
			{ name: 'mapInvoice', type: 'String', replaceValue: '#{invoice}' },
			{ name: 'pipe2', type: 'String', value: '|' },
			{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
			{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
			{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
			{
				name: 'aipSignature',
				type: 'Signature',
				replaceValue: '#{mySignature}',
				messageStartIndex: 0,
				messageEndIndex: 25,
				addressIndex: 29
			}
		]
	});
});

test('fromTx', () => {
	const response = new BSVABI(abi).action('twetch/post@0.0.1').fromTx(rawTx);
	expect(response.toArray()).toStrictEqual([
		'19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut',
		'workflows moving on chain',
		'text/plain',
		'text',
		'twetch_twtext_1586368601417.txt',
		'|',
		'1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5',
		'SET',
		'twdata_json',
		'null',
		'url',
		'null',
		'comment',
		'null',
		'mb_user',
		'4721',
		'reply',
		'null',
		'type',
		'post',
		'timestamp',
		'null',
		'app',
		'twetch',
		'invoice',
		'6796a724-ecae-4f3c-8fcd-8d293916feb8',
		'|',
		'15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva',
		'BITCOIN_ECDSA',
		'1HVieydsEtNMX7JvhVwGt7hjyqoVNtwaot',
		'ILO6K6jZFfigg8N5NwmrrPee72vzrrFP47aVaqZJ8jcIG18aqw/im//Im0PwChxr05j8Zg34vfbn/kd9hkY7KBQ='
	]);
});

test('fromObject', () => {
	const response = new BSVABI(abi)
		.action('twetch/post@0.0.1')
		.fromObject({ bContent: 'hello world' });
	expect(response.toArray()).toStrictEqual([
		'19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut',
		'hello world',
		'text/plain',
		'text',
		'twetch.txt',
		'|',
		'1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5',
		'SET',
		'twdata_json',
		'null',
		'url',
		'null',
		'comment',
		'null',
		'mb_user',
		'null',
		'reply',
		'null',
		'type',
		'post',
		'timestamp',
		'null',
		'app',
		'twetch',
		'invoice',
		'#{invoice}',
		'|',
		'15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva',
		'BITCOIN_ECDSA',
		'#{myAddress}',
		'#{mySignature}'
	]);
});

test('fromArray', () => {
	const response = new BSVABI(abi)
		.action('twetch/post@0.0.1')
		.fromArgs([
			'19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut',
			'workflows moving on chain',
			'text/plain',
			'text',
			'twetch_twtext_1586368601417.txt',
			'|',
			'1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5',
			'SET',
			'twdata_json',
			'null',
			'url',
			'null',
			'comment',
			'null',
			'mb_user',
			'4721',
			'reply',
			'null',
			'type',
			'post',
			'timestamp',
			'null',
			'app',
			'twetch',
			'invoice',
			'6796a724-ecae-4f3c-8fcd-8d293916feb8',
			'|',
			'15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva',
			'BITCOIN_ECDSA',
			'1HVieydsEtNMX7JvhVwGt7hjyqoVNtwaot',
			'ILO6K6jZFfigg8N5NwmrrPee72vzrrFP47aVaqZJ8jcIG18aqw/im//Im0PwChxr05j8Zg34vfbn/kd9hkY7KBQ='
		]);
	expect(response.toArray()).toStrictEqual([
		'19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut',
		'workflows moving on chain',
		'text/plain',
		'text',
		'twetch_twtext_1586368601417.txt',
		'|',
		'1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5',
		'SET',
		'twdata_json',
		'null',
		'url',
		'null',
		'comment',
		'null',
		'mb_user',
		'4721',
		'reply',
		'null',
		'type',
		'post',
		'timestamp',
		'null',
		'app',
		'twetch',
		'invoice',
		'6796a724-ecae-4f3c-8fcd-8d293916feb8',
		'|',
		'15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva',
		'BITCOIN_ECDSA',
		'1HVieydsEtNMX7JvhVwGt7hjyqoVNtwaot',
		'ILO6K6jZFfigg8N5NwmrrPee72vzrrFP47aVaqZJ8jcIG18aqw/im//Im0PwChxr05j8Zg34vfbn/kd9hkY7KBQ='
	]);
});
