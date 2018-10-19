const customDerive = async () => {
//snackbar
var snackbarContainer = document.querySelector('#tumble-toast');
var showToastButton = document.querySelector('#show-toast');
var data = {message: 'Sent.'};

//user input
var initial = document.getElementById('initialPass').value;
var sendAddress = document.getElementById('sendAddress').value;
var amountTo = document.getElementById('amountTo').value;
var userDerive = document.getElementById('userDerive').value;

//derive address from seed
var seed = bip39.mnemonicToSeed(initial)
let masterNode = ark.HDNode.fromSeedBuffer(seed, devnet)
let masterAcct = masterNode.derivePath(""+userDerive+"").keyPair
let pubkey = masterAcct.getPublicKeyBuffer().toString("hex");

//create tx
const transactions = []
{
	var tx = {
		type: 0,
		amount: (amountTo * Math.pow(10, 8)) - amountfee * Math.pow(10, 7),
		fee: 10000000,
		recipientId: sendAddress,
		timestamp: ark.slots.getTime(),
		senderPublicKey: pubkey,
		asset: {}
	};
	//sign tx
	var hash = ark.crypto.getHash(tx, true, true);
	tx.signature = masterAcct.sign(hash).toDER().toString("hex");
	tx.id = ark.crypto.getId(tx);
	transactions.push(tx)
	console.log(tx);
}

//broadcast tx
{  
	axios
	.post('http://'+nodeip+':'+port+'/api/v2/transactions', { transactions })
	.then(response => { 
		let txstatus = response.data.data.accept;
		console.log(txstatus);
		if (!txstatus || txstatus.length === 0) {
			alert("Invalid transaction.");
		}
		else
			snackbarContainer.MaterialSnackbar.showSnackbar(data);
	});
}
}