// importando as dependências

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
const network = bitcoin.networks.testnet
// const network = bitcoin.networks.bitcoin    //caso queira usar mainnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0`

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed =  bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando um conta par de pvt  e pubkey
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,   
}).address

console.log("carteira gerada")
console.log("Endereço: ",btcAddress.toString('hex'))
console.log("Chave privada: ",node.toWIF())
console.log("Seed: ", mnemonic)

//Mario Ruben Lima de Oliveira
//https://www.linkedin.com/in/mario-ruben/