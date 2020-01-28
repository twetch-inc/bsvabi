const BSVABI = require('./bsvabi');
const axios = require('axios');

const abi = {
	name: 'Twetch',
	hostname: 'twetch.com',
	endpoint: 'api.twetch.com/publish',
	actions: {
		'twetch/post@0.0.0': {
			contentIndex: 1,
			filenameIndex: 4,
			contentTypeIndex: 2,
			args: [
				{ name: 'bNamespace', type: 'Address', value: '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut' },
				{ name: 'bContent', encodingIndex: 3 },
				{ name: 'bContentType', type: 'String', defaultValue: 'text/plain' },
				{ name: 'bEncoding', type: 'String', defaultValue: 'text' },
				{ name: 'bFilename', type: 'String' },
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
				{ name: 'mapTypeKey', type: 'String', value: 'type' },
				{ name: 'mapType', type: 'String', defaultValue: 'post' },
				{ name: 'mapTimestampKey', type: 'String', value: 'timestamp' },
				{ name: 'mapTimestamp', type: 'String', defaultValue: 'null' },
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
					messageEndIndex: 21,
					addressIndex: 25
				}
			]
		},
		'twetch/post-reply@0.0.0': {
			args: [
				{ name: 'bNamespace', type: 'Address', value: '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut' },
				{ name: 'bContent', type: 'String' },
				{ name: 'bContentType', type: 'String', defaultValue: 'text/plain' },
				{ name: 'bEncoding', type: 'String', defaultValue: 'text' },
				{ name: 'bFilename', type: 'String' },
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
					messageEndIndex: 23,
					addressIndex: 27
				}
			]
		}
	}
};

(async () => {
	const response = await axios.get(
		'https://ink.twetch.com/nodeapi/tx/05c2a00d804e8fac0bdaf7cfe5c7edd947f7547ae79086f9ef71d999246a4b60'
	);

	//const post = new BSVABI(abi).action('twetch/post@0.0.0').fromTx(response.data.hex);
	//post.toFile();

	const file = new BSVABI(abi)
		.action('twetch/post@0.0.0')
		.fromFile('twetch_twembed1579847869652.jpg');

	console.log(file.toArray());
})();
