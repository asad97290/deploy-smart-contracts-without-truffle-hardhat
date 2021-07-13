const Web3 = require('web3');
const contractFile = require('./compile');// Initialization
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;
const privKey ='f10d3afb1c2216a09a0ace270207f434978621034d4fef4db66c3fb68beb4b09'; // Genesis private key
const address = '0x7903986291455797eFE7FE0FC76663EDAF4911CF';
const web3 = new Web3('https://rinkeby.infura.io/v3/a069e312dcc14ff3a46bd081387287c2');// Deploy contract
const deploy = async () => {
   console.log('Attempting to deploy from account:', address);
   const incrementer = new web3.eth.Contract(abi);
   const incrementerTx = incrementer.deploy({
      data: bytecode,
      arguments: [5],
   });
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         from: address,
         data: incrementerTx.encodeABI(),
         gas: '210000',
      },
      privKey
   );const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log('Contract deployed at address', createReceipt.contractAddress);
};

deploy();
