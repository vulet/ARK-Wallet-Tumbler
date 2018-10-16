const random = Math.floor(Math.random() * 10);
const passphrase = require("bip39").generateMnemonic();
const address = ark.crypto.getAddress(ark.crypto.getKeys(passphrase).publicKey)

//create/read, address directory
var addressread = 0;
var addresswrite = 1;
//create/read, passphrase directory
var passphraseread = 0;
var passphrasewrite = 1;

//create, wallet directory
var walletwrite = 2;

//tx fees
var amountOriginal = 0.1;
var amountfee = 1;

//amount of tumbles
var zerotumble = 1;
var zerotumblecounter = 1;
var zerotumblelog = 1;
var initialsnack = 0;