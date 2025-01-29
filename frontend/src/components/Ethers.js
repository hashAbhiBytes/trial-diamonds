import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { getEthersProvider } from "../utils/web3"
import "../styles.css"

export function Ethers() {
  const [account, setAccount] = useState(null)

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const provider = getEthersProvider()
        const accounts = await provider.send("eth_requestAccounts", [])
        setAccount(accounts[0])
      } catch (err) {
        console.error("Failed to connect wallet:", err)
      }
    }

    connectWallet()
  }, [])

  return (
    <div className="container">
      <h2>Connected Account: {account || "Not Connected"}</h2>
    </div>
  )
}

