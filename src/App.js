import React, { Component } from 'react';
import Web3 from 'web3';

import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      account: '',
      taskCount: 0
    }
  }

  async loadBlockChainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost8545")
    const network = await web3.eth.net.getNetworkType()
    // console.log("network: ", network)
    const accounts = await web3.eth.getAccounts()
    // console.log("account: ", accounts)
    this.setState({
      account: accounts[0]
    })

    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    this.setState({ todoList })
    console.log("todoList", todoList)

    const taskCount = await todoList.methods.taskCount().call()
    this.setState({ taskCount })
  }

  componentDidMount() {
    this.loadBlockChainData()
  }


  render() {
    const { account, taskCount } = this.state;
    return (
      <div className="App">
        <h1>TODO LIST</h1>
        <p>Your account: {account}</p>
        <p>Your task count: {taskCount}</p>
      </div>
    );
  }
}

export default App;
