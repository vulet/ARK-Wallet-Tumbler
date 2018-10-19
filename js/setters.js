var newPath = "derivePath(\"\m/44'/111'/9'/0/"

//If you wish to change networks, you should change the below settings along with the derive path
//Please see https://github.com/ArkEcosystem/AIPs/issues/29 for path compliance
//The devnet settings below can be found here: https://github.com/ArkEcosystem/core/blob/master/packages/crypto/lib/networks/ark/devnet.json,
var devnet = {
	messagePrefix: '\x18Devnet Signed Message:\n',
	bip32: {
		public: 46090600, 
		private: 46089520 
	},
	nethash: '2a44f340d76ffc3df204c5f38cd355b7496c9065a1ade2ef92071436bd72e867',
    pubKeyHash: 30, 
    wif: 170
}

//HD increments
var incrementF = 0
var incrementP = 0
var incrementA = 1
//tx fees
var amountOriginal = 0.1;
var amountfee = 1;
var amountNew = (amountTo - .1);
//number of tumbles
var zerotumble = 1;
var zerotumblecounter = 0;
var zerotumblelog = 1;
var initialsnack = 0;
