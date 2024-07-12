const {Web3}= require("web3");
const {dotenv} = require("dotenv");
const ABI = require("../ABI.json");
const web3 = new Web3(process.env.API_KEY);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(ABI,contractAddress);
 
module.exports={contract}
