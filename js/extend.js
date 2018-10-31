const findExtend = async () => {
//snackbar
var snackbarContainer = document.querySelector('#tumble-toast');
var showToastButton = document.querySelector('#show-toast');
var data = {message: 'Sent.'};

//user input
var initial = document.getElementById('initialPass').value;
var userDerive = document.getElementById('userDerive').value;

//derive address from seed
var seed = bip39.mnemonicToSeed(initial)
let masterNode = ark.HDNode.fromSeedBuffer(seed, devnet)
let masterAcct = masterNode.derivePath(""+userDerive+"")

xprvString = masterAcct.toBase58()
console.log("xprivString");
console.log(xprvString);
document.getElementById('xprv').innerHTML = xprvString

xpubString = masterAcct.neutered().toBase58()
console.log("xpubString");
console.log(xpubString);
document.getElementById('xpub').innerHTML = xpubString
}