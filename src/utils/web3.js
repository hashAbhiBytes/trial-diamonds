import { ethers } from 'ethers'
import { BLOCKCHAIN_CONFIG } from '../config/blockchain'

export async function connectToMetaMask() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not installed')
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    
    // Switch to Mumbai network if needed
    await switchNetwork()
    
    return signer
  } catch (error) {
    console.error('Error connecting to MetaMask:', error)
    throw error
  }
}

async function switchNetwork() {
  const mumbai = BLOCKCHAIN_CONFIG.networks.mumbai
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: mumbai.chainId }],
    })
  } catch (error) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [mumbai],
      })
    } else {
      throw error
    }
  }
}

export async function getDiamondContract(signer) {
  return new ethers.Contract(
    BLOCKCHAIN_CONFIG.contracts.diamond.address,
    BLOCKCHAIN_CONFIG.contracts.diamond.abi,
    signer
  )
}