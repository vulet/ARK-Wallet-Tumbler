var ark = require('arkjs');
const axios = require('axios');
const fs = require('fs');
var bip39 = require('bip39');

//set the node you wish to use
var nodeip = '?';
//set the nodes port
var port = '?';

//master wallet to first tumble
const init = async () => {

//snackbar & user input
var snackbarContainer = document.querySelector('#tumble-toast');
var showToastButton = document.querySelector('#show-toast');
var data = {message: "Tumbled to: " +newPath + initialsnack+"\"\)"};
console.log(data);
var initial = document.getElementById('initialPass').value;
var numblertumble = document.getElementById('numblertumble').value;
var amountTo = document.getElementById('amountTo').value;

//derive new address from seed
var seed = bip39.mnemonicToSeed(initial)
let masterNode = ark.HDNode.fromSeedBuffer(seed, devnet)
let masterAcct = masterNode.derivePath("m/44'/111'/1'")
let address0 = masterAcct.derivePath("0/0").keyPair.getAddress();
let pubkey0 = masterAcct.derivePath("0/0").getPublicKeyBuffer().toString("hex");
var parentKey = ark.crypto.getKeys(initial);
fs.writeFile('tumbling/derivePath.json', JSON.stringify(data), 'utf8', err => { if (err) console.log(err) });

//create tx
const transactions = []
{
  var tx = {
    type: 0,
    amount: (amountTo * Math.pow(10, 8)) - (amountOriginal++ * Math.pow(10, 8)),
    fee: 10000000,
    recipientId: address0,
    timestamp: ark.slots.getTime(),
    senderPublicKey: parentKey.publicKey,
    asset: {}
  };
  //sign tx
  var hash = ark.crypto.getHash(tx, true, true);
  tx.signature = parentKey.sign(hash).toDER().toString("hex");
  tx.id = ark.crypto.getId(tx);
  transactions.push(tx)
  console.log(tx);
}

//broadcast
{
  axios
  .post('http://'+nodeip+':'+port+'/api/v2/transactions', { transactions })
  .then(response => { 
    let txstatus = response.data.data.accept;
    console.log(response.data);
    if (!txstatus || txstatus.length === 0) {
      alert("Invalid transaction.");
    }
    else
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
  });
}

//tumble until end tumble
const interval = setInterval (function () {
  const tumble = async () => {
    var snackbarContainer = document.querySelector('#tumble-toast');
    var showToastButton = document.querySelector('#show-toast');
    var data = {message: 'Tumbled to: '+newPath+ ++zerotumblecounter+"\"\)"};
    console.log(data);
    let childKey = masterAcct.derivePath('0/'+incrementF++).keyPair
    let childAddress = masterAcct.derivePath('0/'+incrementA++).keyPair.getAddress();
    let pubkey = masterAcct.derivePath('0/'+incrementP++).getPublicKeyBuffer().toString("hex");
    fs.writeFile('tumbling/derivePath.json', JSON.stringify(data), 'utf8', err => { if (err) console.log(err) });
    //subtract initial fee
    var amountNew = (amountTo - .1);

    //create tx
    const transactions = []
    {
      var tx = {
        type: 0,
        amount: (amountNew * Math.pow(10, 8)) - amountfee++ * Math.pow(10, 7),
        fee: 10000000,
        recipientId: childAddress,
        timestamp: ark.slots.getTime(),
        senderPublicKey: pubkey,
        asset: {}
      };
      //sign tx
      var hash = ark.crypto.getHash(tx, true, true);
      tx.signature = childKey.sign(hash).toDER().toString("hex");
      tx.id = ark.crypto.getId(tx);
      transactions.push(tx)
      console.log(tx);
    }

    //broadcast
      {
        axios
        .post('http://'+nodeip+':'+port+'/api/v2/transactions', { transactions })
        .then(response => { 
          let txstatus = response.data.data.accept;
          console.log(response.data);
          if (!txstatus || txstatus.length === 0) {
            window.clearInterval(interval);
            alert("Invalid transaction, last location: ~/tumbling/derivePath.json (0,#hops)-1.");
          }
          else
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        });
      }
    }
    //tumble until finish
    tumble()
    //Initial parentkey to childkey(0/0) counts as a hop.
    if (++zerotumble == numblertumble) {
      window.clearInterval(interval);
    }
    //tumble every 25 seconds
  }, 25 * 1000);
}