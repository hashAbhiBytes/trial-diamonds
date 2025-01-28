import React, { useState, useEffect } from 'react'
import { connectToMetaMask } from '../utils/web3'

function MetaMaskConnect() {
  const [account, setAccount] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          setAccount('')
        }
      })
    }
  }, [])

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const signer = await connectToMetaMask()
      const address = await signer.getAddress()
      setAccount(address)
    } catch (error) {
      console.error('Connection error:', error)
      alert('Failed to connect to MetaMask')
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div>
      {account ? (
        <div>
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      ) : (
        <button 
          onClick={handleConnect}
          disabled={isConnecting}
          className="connect-button"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  )
}

export default MetaMaskConnect