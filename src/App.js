import logo from './logo.svg';
import './App.css';
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import Web3modal from './ConnectButton/Web3modal';


const BSC = {
  chainId: 97,
  name: "BSC testnet",
  currency: "BNB",
  explorerUrl: "https://testnet.bscscan.com/",
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
};

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  includeWalletIds: [
    // "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    // "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
  ],
  ethersConfig: defaultConfig({
    metadata,
    defaultChainId: 97,
    enableEIP6963: true,
    enableInjected: false,
  }),
  chains: [BSC],
  projectId: "067b44ca33af88c79da3b5e8c761e1f8",
});

function App() {

  return (
    <div className="App">
     <Web3modal/>
    </div>
  );
}

export default App;
