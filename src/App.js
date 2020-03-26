import React, { Component } from 'react';
import Web3 from 'web3';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      account: ''
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
  }

  componentDidMount() {
    this.loadBlockChainData()
  }


  render() {
    const { account } = this.state;
    return (
      <div className="App">
        <h1>Hello</h1>
        <p>Your account: {account}</p>
      </div>
    );
  }
}

export default App;
