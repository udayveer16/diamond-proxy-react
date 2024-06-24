import React, { useEffect, useState } from 'react'
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits } from 'ethers'

const diamondAddres = "0xd3b108bf03cc47635C5F114c274d492514EB3aA5"
const abi = [
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "admin",
        "type": "address"
      }
    ],
    "name": "removeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceAdminRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_inc",
        "type": "uint256"
      }
    ],
    "name": "setCounter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newSuperAdmin",
        "type": "address"
      }
    ],
    "name": "transferAdminRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner_",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const Web3modal = () => {
    const { open } = useWeb3Modal();
    const [Count, setCount] = useState("none")
    const [NewCount, setNewCount] = useState("none")
    const [Admin, setAdmin] = useState("")
    const { address, chainId, isConnected } = useWeb3ModalAccount()
    const [contract,setContract]=useState()
    const { walletProvider } = useWeb3ModalProvider()

    const createProvider=async()=>{
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const diamond = new Contract(diamondAddres, abi, signer)
      setContract(diamond)
    }


    useEffect(() => {
    createProvider()
    },[])
    

    async function getCounter() {
      if (!isConnected) throw Error('User disconnected')

      const counter = await contract.getCounter();
      setCount(counter.toString());
    }

    function newCounter(e) {
      setNewCount(e.target.value)
    }

    async function setCounter() {
      const trx = await contract.setCounter(NewCount)
      const result = await trx.wait()
    }

    async function getAdmin() {
      const admin = await contract.owner();
      setAdmin(admin)
    }


  return (
    <div>
      <br/>
      <button onClick={() => open()}>Open Connect Modal</button><br/><br/>
      <div>
        Counter : {Count} <br/>
        <button onClick={() => getCounter()}>get Counter</button>
      </div><br/>
      <div>
        <input
        type="number"
        placeholder="new counter"
        onChange={newCounter}
        />
        <button onClick={() => setCounter()}>Set Counter</button>
      </div><br/>
      <div>
        Proxy Owner : {Admin}
        <button onClick={() => getAdmin()}>Get Admin</button>
      </div>
    </div>
  )
}

export default Web3modal