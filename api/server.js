// 
const { Web3 } = require("web3");
const express = require('express');
const ABI = require("./ABI.json");

const app = express();
const PORT = 3000;

const web3 = new Web3("https://sepolia.infura.io/v3/db2b24363e9847c0b0373d8f4259867a");
const contractAddres = "0xf180FC8d8A0f624244067E7eDaDCB4A119A2A8aA";
const contract = new web3.eth.Contract(ABI, contractAddres);


const viewAllTask = async () => {
  const allTask = await contract.methods.allTask().call();
  console.log(allTask);
}

viewAllTask();
app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
})