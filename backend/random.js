//const a = require('crypto').randomBytes(64).toString('hex');
//console.log(a);

require('dotenv').config();

console.log("Infura Project ID:", process.env.INFURA_PROJECT_ID);

const { ethers } = require('ethers');
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

provider.getBlockNumber().then(console.log).catch(console.error);
