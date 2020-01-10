const BSVABI = require('./bsvabi');
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
				{ name: 'aipSigningAddress', type: 'Address', value: '#{myAddress}' },
				{ name: 'aipSignature', type: 'Signature', value: '#{mySignature}' }
			]
		}
	}
};

const twetchABI = new BSVABI(abi);
//const postAction = twetchABI
//.action('post')
//.fromArgs([
//'19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut',
//'the banking system of the entire world is better off on bitcoin',
//'text/plain',
//'text',
//'twetch_twtext_1578614129497.txt',
//'|',
//'1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5',
//'SET',
//'twdata_json',
//'null',
//'url',
//'null',
//'comment',
//'null',
//'mb_user',
//'2275',
//'type',
//'post',
//'timestamp',
//'9723079893481366',
//'app',
//'twetch',
//'|',
//'15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva',
//'BITCOIN_ECDSA',
//'#{myAddress}',
//'#{mySignature}'
//]);

const post = twetchABI
	.action('post')
	.fromTx(
		'0100000002dac17e86511a516f21657f9a19fd85e330b9abb1fc87c00f898273529c42584f040000006b483045022100fcca35c63c1976b778f50b3649aa9ce0158cd51d0c2126efd42290a272c4817c02201956a4e7179a7d414eab7fac69d436b2a65e4c2ecad6fbc73c500d05fe15b5f4412102efe00db93a4a8812513e8f68d8ce4bdb4f2e46f6adf29c94bd05afa202e79811ffffffffb6a40c02b371f281fb5bcfae22dd370c7d53aff2bb3782d289b313e946d2ae77020000006b48304502210093b95c47ab71c60c2cc8465e041377182c7d2ade9dcaf39d80044c33c276b4da02203d39288d650a43967c21f852f84303492763741031ce7230fef4c60ce4fa338741210292e3a788d70921e4f08d05797f2a10c7cba4fa1c1f3c4ce70c7dc73c327eb956ffffffff060000000000000000fd15026a2231394878696756345179427633744870515663554551797131707a5a56646f4175744c8240323420697320726561647920666f722063727970746f20344420636865737320746f75726e616d656e742e0a68747470733a2f2f7477657463682e6170702f742f383231663336323065383737393464646631343639383761366434613135336530353137336465353238616361343931653765303836333963666365303438310a746578742f706c61696e04746578741f7477657463685f7477746578745f313537383536393835303030302e747874017c223150755161374b36324d694b43747373534c4b79316b683536575755374d74555235035345540b7477646174615f6a736f6e046e756c6c0375726c046e756c6c07636f6d6d656e74046e756c6c076d625f757365720434303730047479706504706f73740974696d657374616d7010393637383830303337333432313633380361707006747765746368017c22313550636948473232534e4c514a584d6f53556157566937575371633768436676610d424954434f494e5f454344534122314a4c4275744d5a5055377875325055425078656b5463704a4b507a5a756154755a4c584838764a76667172442f50456c384c2b304e724b79386c4f4c4a4a5a457945474b456b34584259702f796559656a622f5657307936776f62443753706672554a492b2f7749474d56364f304c47306548413856672f73633d66030000000000001976a91427341aa70472fd9ba71d30c540d0390b7f8e175688acfd100000000000001976a91427341aa70472fd9ba71d30c540d0390b7f8e175688acfd100000000000001976a91427341aa70472fd9ba71d30c540d0390b7f8e175688ac6c3f0000000000001976a9148c0e3b70ca3f0554d815925ca13755c668a1527d88acf2430000000000001976a91405186ff0710ed004229e644c0653b2985c648a2388ac00000000'
	);

console.log(JSON.stringify(post.toObject(), null, 2));
