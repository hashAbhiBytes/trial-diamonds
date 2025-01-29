import React, { useState } from 'react';
import { connectWallet } from './MetaMaskConnect';

const NavBar = () => {
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnectWallet = async () => {
    try {
      const { address } = await connectWallet();
      setWalletAddress(address);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav>
      <h1>Diamond Blockchain</h1>
      <button onClick={handleConnectWallet}>
        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : 'Connect Wallet'}
      </button>
    </nav>
  );
};

export default NavBar;