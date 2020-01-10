const BSVABI = require('./bsvabi');
const axios = require('axios');

const abi = {
	name: 'Twetch',
	hostname: 'twetch.com',
	endpoint: 'api.twetch.com/publish',
	actions: {
		post: {
			args: [
				{ name: 'bNamespace', type: 'Address', value: '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut' },
				{ name: 'bContent', type: 'String' },
				{ name: 'bContentType', type: 'String' },
				{ name: 'bEncoding', type: 'String' },
				{ name: 'bFilename', type: 'String' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'mapNamespace', type: 'Address', value: '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5' },
				{ name: 'mapAction', type: 'String', value: 'SET' },
				{ name: 'mapTwdataKey', type: 'String', value: 'twdata_json' },
				{ name: 'mapTwdata', type: 'String' },
				{ name: 'mapUrlKey', type: 'String', value: 'url' },
				{ name: 'mapUrl', type: 'String' },
				{ name: 'mapCommentKey', type: 'String', value: 'comment' },
				{ name: 'mapComment', type: 'String' },
				{ name: 'mapMbUserKey', type: 'String', value: 'mb_user' },
				{ name: 'mapMbUser', type: 'String' },
				{ name: 'mapTypeKey', type: 'String', value: 'type' },
				{ name: 'mapType', type: 'String', value: 'post' },
				{ name: 'mapTimestampKey', type: 'String', value: 'timestamp' },
				{ name: 'mapTimestamp', type: 'String' },
				{ name: 'mapAppKey', type: 'String', value: 'app' },
				{ name: 'mapApp', type: 'String', value: 'twetch' },
				{ name: 'pipe2', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 22,
					addressIndex: 25
				}
			]
		}
	}
};

const twetchABI = new BSVABI(abi);

(async () => {
	const response = await axios.get(
		'https://api.whatsonchain.com/v1/bsv/main/tx/hash/92407bbb14d9fd527891168838fc7dff0bf377dc009a7cadcacf1bc9a75afc44'
	);
	const post = twetchABI.action('post').fromTx(response.data.hex);
	console.log(JSON.stringify(post.toObject(), null, 2));
})();
