// 
const { Web3 } = require("web3");
const express = require('express');
const ABI = require("./ABI.json");

const app = express();
const PORT = 3000;

const web3 = new Web3("https://sepolia.infura.io/v3/db2b24363e9847c0b0373d8f4259867a");
const contractAddres = "0xf180FC8d8A0f624244067E7eDaDCB4A119A2A8aA";
const contract = new web3.eth.Contract(ABI, contractAddres);


app.get("/api/ethereum/view-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await contract.methods.viewTask(taskId).call();
    const { id, name, date } = task;
    const numId = Number(id);
    const taskObj = {
      numId, name, date
    }
    res.status(200).json({ status: 200, taskObj, message: "Task exist" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Task ID does notexist" });
  }
})



app.get("/api/ethereum/view-all-task", async (req, res) => {
  try {
    const tasks = await contract.methods.allTask().call();

    if (tasks.length > 0) {
      const taskList = tasks.map(({ id, name, date }) => {
        const taskId = Number(id);
        return { taskId, name, date };
      })
      res.status(200).json({ status: 200, taskList, message: "Task exist" });
    }else if(tasks.length < 0){
      res.status(400).json({ status: 200, message: "No Task exist" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Task ID does notexist" });
  }
})
app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
})