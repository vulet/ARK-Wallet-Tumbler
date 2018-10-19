# The ARK Wallet Tumbler
![ARKtumbler](https://i.imgur.com/3XxZjVY.png "ARKtumbler")

## Description
The ARK-Wallet-Tumbler utilizes [BIP-32 CKD](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) to tumble wallet addresses which are derived from your seed. The *"Manual"* function allows you to send transactions from these [derived paths](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki). The compliance standard for ARK derive paths can be found at [AIP-20](https://github.com/ArkEcosystem/AIPs/issues/29). The tumbler defaults to ```m/44'/111'/1'/0/0``` and increments. The first tumble starts at your master seed and goes to CKD ```0/0```, the second tumble goes from CKD ```0/0``` to CKD ```0/1```, and so on.
![BIP-32 CKD](https://github.com/bitcoin/bips/blob/master/bip-0032/derivation.png)

```m / purpose' / coin_type' / account' / change / address_index```
## Installation
1. ```git clone https://github.com/vulet/Ark-Wallet-Tumbler```
2. ```cd ARK-Wallet-Tumbler```
3. ```npm install```
4. ```npm start```

You'll need to change the peer IP and port in ```renderer.js```. This should only be used on Devnet. Network config can be found in ~/js/setters.js The ARK logo attribute was made by my good friend Lint.

## License

This project is licensed under GNU General Public License v3. - see the [LICENSE.md](LICENSE) file for details

----
## Example

![Example1](https://i.imgur.com/S7MbHsA.png)

Donation address: AVUL7M7Fu3JSHpnJYNUhpTFNcnLUJDYNT9

