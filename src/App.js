
import './App.css';
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import Web3modal from './Web3Modal/Web3modal';


const BSC = {
  chainId: 97,
  name: "BSC testnet",
  currency: "BNB",
  explorerUrl: "https://testnet.bscscan.com/",
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
};

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  includeWalletIds: [
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
