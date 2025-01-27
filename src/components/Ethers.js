import { ethers } from "ethers"
import ABI from "./contractABI.json"

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS

if (!CONTRACT_ADDRESS) {
  throw new Error("Contract address not found in environment variables")
}

export const getProviderAndSigner = async () => {
  if (typeof window === "undefined") {
    throw new Error("This function must be called on the client side")
  }

  if (!window.ethereum) {
    throw new Error("Ethereum provider not found. Please install MetaMask or another Web3 wallet")
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = await provider.getSigner()

    return { provider, signer }
  } catch (error) {
    console.error("Failed to get provider and signer:", error)
    throw new Error("Failed to connect to your wallet. Please check your connection and try again")
  }
}

export const getContractInstance = async () => {
  try {
    const { signer } = await getProviderAndSigner()
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
  } catch (error) {
    console.error("Failed to create contract instance:", error)
    throw new Error("Failed to initialize the smart contract. Please check your connection")
  }
}

class ContractError extends Error {
  constructor(context, originalError) {
    super(`Failed to ${context}: ${originalError.message}`)
    this.name = "ContractError"
  }
}

export const addDiamond = async (name, price, certificateHash) => {
  try {
    const contract = await getContractInstance()
    const parsedPrice = ethers.parseEther(price)
    const tx = await contract.addDiamond(name, parsedPrice, certificateHash)
    return tx
  } catch (error) {
    throw new ContractError("add diamond", error)
  }
}

export const buyDiamond = async (diamondId) => {
  try {
    const contract = await getContractInstance()
    const diamond = await contract.getDiamond(diamondId)
    const tx = await contract.buyDiamond(diamondId, { value: diamond.price })
    return tx
  } catch (error) {
    throw new ContractError("buy diamond", error)
  }
}

export const getDiamondDetails = async (diamondId) => {
  try {
    const contract = await getContractInstance()
    return await contract.getDiamond(diamondId)
  } catch (error) {
    throw new ContractError("get diamond details", error)
  }
}

export const formatTransactionError = (error) => {
  if (error instanceof ContractError) {
    return error.message
  }

  if (error.message.includes("insufficient funds")) {
    return "Insufficient funds in your wallet to complete this transaction"
  }

  if (error.message.includes("user rejected")) {
    return "Transaction was rejected. Please try again"
  }

  return "An unexpected error occurred. Please try again"
}