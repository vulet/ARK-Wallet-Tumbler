function showAddress(){
  var initialPass = document.getElementById('initialPass').value;
  var initial = ark.crypto.getAddress(ark.crypto.getKeys(initialPass).publicKey)
  document.getElementById('userMsg').innerHTML = initial;
console.log("initial address: " + initial);
}

function showTumbles(){
  var numblertumble = document.getElementById('numblertumble').value;
  document.getElementById('tumbleNo').innerHTML = numblertumble;
console.log("number of tumbles: " + numblertumble);
}

function showamountTo(){
  var amountTo = document.getElementById('amountTo').value;
  document.getElementById('amountNo').innerHTML = amountTo;
console.log("amount to tumble: " + amountTo);
}

function handler(e) {
  e.target.removeEventListener(e.type, arguments.callee);

  alert("The tumbling process has started. Do not run multiple instances of the tumbler. Once you are done using the tumbler, save your wallet into another directory to prevent it from being overwritten. ");
}

(function() {
  'use strict';
  window['counter'] = 0;
  var snackbarContainer = document.querySelector('#tumble-toast');
  var showToastButton = document.querySelector('#show-toast');
  
}());
