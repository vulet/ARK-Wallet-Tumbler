var ark = require('arkjs');
const axios = require('axios');
const fs = require('fs');

//default to devnet
ark.crypto.setNetworkVersion(30)

//set the node you wish to use
var nodeip = '?';

//set the nodes port
var port = '?';

//master wallet to first tumble
const init = async () => {

//snackbar/toast
var snackbarContainer = document.querySelector('#tumble-toast');
var showToastButton = document.querySelector('#show-toast');
var data = {message: 'Saved wallet to ~/tumbling/wallets/walletDir'+random+'/' + ++initialsnack};
snackbarContainer.MaterialSnackbar.showSnackbar(data);

//user input
var initial = document.getElementById('initialPass').value;
var numblertumble = document.getElementById('numblertumble').value;
var amountTo = document.getElementById('amountTo').value;

var walletObj = {
    address: address,
    passphrase: passphrase
  };

//handle initial fee
var amountNew = (amountTo - .1);

//save new initial wallet information
fs.writeFile('tumbling/addresses/addressDir'+random+'/0.json', JSON.stringify(address), 'utf8', err => { if (err) console.log(err) });
fs.writeFile('tumbling/passphrases/passphraseDir'+random+'/0.json', JSON.stringify(passphrase), 'utf8', err => { if (err) console.log(err) });
fs.writeFile('tumbling/wallets/walletDir'+random+'/1.json', JSON.stringify(walletObj), 'utf8', err => { if (err) console.log(err) });

const transactions = []
{
  const transaction = ark.transaction.createTransaction(address, (amountTo * Math.pow(10, 8)) - amountOriginal++ * Math.pow(10, 8), null, initial)
  console.log(transaction);
  transactions.push(transaction)
}
{  
  axios
  .post('http://'+nodeip+':'+port+'/api/v2/transactions', { transactions })
  .then(function (response) { console.log(response.data); })
  .catch(function (error) {})
}

//first tumble to end tumble
const interval = setInterval (function () {
const tumble = async () => {
  var snackbarContainer = document.querySelector('#tumble-toast');
  var showToastButton = document.querySelector('#show-toast');
  var data = {message: 'Saved wallet to ~/tumbling/wallets/walletDir'+random+'/' + ++zerotumblecounter};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  console.log(data);
  var address = fs.readFileSync('tumbling/addresses/addressDir'+random+'/'+(addressread++)+'.json', 'utf8', err => { if (err) console.log(err) });
  var passphrase = fs.readFileSync('tumbling/passphrases/passphraseDir'+random+'/'+(passphraseread++)+'.json', 'utf8', err => { if (err) console.log(err) });
  var tumbleaddr = JSON.parse(address);
  var tumblepass = JSON.parse(passphrase);
  var newPassphrase = require("bip39").generateMnemonic();
  var newAddress = ark.crypto.getAddress(ark.crypto.getKeys(newPassphrase).publicKey);
  var walletObj = {
    address: newAddress,
    passphrase: newPassphrase
};

//save new wallet information
fs.writeFile('tumbling/addresses/addressDir'+random+'/'+(addresswrite++)+'.json', JSON.stringify(newAddress), 'utf8', err => { if (err) console.log(err) });
fs.writeFile('tumbling/passphrases/passphraseDir'+random+'/'+(passphrasewrite++)+'.json', JSON.stringify(newPassphrase), 'utf8', err => { if (err) console.log(err) });
fs.writeFile('tumbling/wallets/walletDir'+random+'/'+(walletwrite++)+'.json', JSON.stringify(walletObj), 'utf8', err => { if (err) console.log(err) });

const transactions = []
{
  const transaction = ark.transaction.createTransaction(newAddress, (amountNew * Math.pow(10, 8)) - amountfee++ * Math.pow(10, 7), null, tumblepass)
  console.log(transaction);
  transactions.push(transaction)
}
 {
  axios
  .post('http://'+nodeip+':'+port+'/api/v2/transactions', { transactions })
  .then(response => { 
      let txstatus = response.data.data.accept;
      console.log(txstatus);
      if (!txstatus || txstatus.length === 0) {
      window.clearInterval(interval);
      alert("Please check console logs.");
   }
});
     
  }
}

tumble()
if (++zerotumble == numblertumble) {
  window.clearInterval(interval);
}

//tumble every 25 seconds
}, 25 * 1000);

}