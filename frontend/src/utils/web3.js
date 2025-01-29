import { ethers } from "ethers"

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask!")
      return false
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    if (accounts.length > 0) {
      return true
    }
    return false
  } catch (error) {
    console.error("Error connecting wallet:", error)
    return false
  }
}

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask!")
  }
  return new ethers.BrowserProvider(window.ethereum)
}

export const getSigner = async () => {
  const provider = getProvider()
  return await provider.getSigner()
}

export const addProductToBlockchain = async (productData) => {
  try {
    const signer = await getSigner()
    // Add your contract interaction code here
    // This is where you would interact with your smart contract
    console.log("Adding product:", productData)
    return true
  } catch (error) {
    console.error("Error in addProductToBlockchain:", error)
    throw error
  }
}

export const getProducts = async () => {
  try {
    const provider = getProvider()
    // Add your contract interaction code here
    // This is where you would fetch products from your smart contract

    // Temporary mock data
    return [
      {
        name: "Diamond Ring",
        description: "Beautiful 2 carat diamond ring",
        price: "2.5",
        image: "https://example.com/diamond-ring.jpg",
      },
      // Add more mock products as needed
    ]
  } catch (error) {
    console.error("Error in getProducts:", error)
    throw error
  }
}

