import React, { useState } from "react"
import { ethers } from "ethers"

const MetaMaskConnect = ({ setAccount, onError }) => {
  const [loading, setLoading] = useState(false)

  const connectToMetaMask = async () => {
    setLoading(true)
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed. Please install it to proceed.")
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const account = await signer.getAddress()
      setAccount(account)

      console.log("Connected account:", account)
    } catch (error) {
      console.error("Error connecting to MetaMask:", error)
      onError(error.message || "Failed to connect to MetaMask")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="metamask-connect">
      <button onClick={connectToMetaMask} disabled={loading}>
        {loading ? "Connecting..." : "Connect Wallet"}
      </button>
    </div>
  )
}

export default MetaMaskConnect;