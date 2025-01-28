export const BLOCKCHAIN_CONFIG = {
    networks: {
      mumbai: {
        chainId: '0x13881',
        chainName: 'Mumbai Testnet',
        rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        }
      }
    },
    contracts: {
      diamond: {
        abi: require('../components/contractABI.json'),
        address: process.env.REACT_APP_CONTRACT_ADDRESS || ''
      }
    }
  }