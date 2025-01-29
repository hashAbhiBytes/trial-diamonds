import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import { getContractInstance } from "./Ethers"
import "./styles.css"

const MyListing = () => {
  const [myDiamonds, setMyDiamonds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMyDiamonds = async () => {
      try {
        const contract = await getContractInstance()
        const account = await contract.runner.getAddress()
        const diamondCount = await contract.diamondCount()

        const userDiamonds = []
        for (let i = 0; i < diamondCount; i++) {
          const diamond = await contract.getDiamond(i)
          if (diamond.owner.toLowerCase() === account.toLowerCase()) {
            userDiamonds.push({
              id: i,
              name: diamond.name,
              price: ethers.formatEther(diamond.price),
              certificateHash: diamond.certificateHash,
              isForSale: diamond.isForSale,
            })
          }
        }

        setMyDiamonds(userDiamonds)
      } catch (error) {
        console.error("Error fetching my diamonds:", error)
        setError("Failed to fetch your diamonds. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchMyDiamonds()
  }, [])

  const handleToggleSale = async (diamondId, currentSaleStatus) => {
    try {
      const contract = await getContractInstance()
      const tx = await contract.toggleForSale(diamondId)
      await tx.wait()

      setMyDiamonds((prevDiamonds) =>
        prevDiamonds.map((diamond) =>
          diamond.id === diamondId ? { ...diamond, isForSale: !currentSaleStatus } : diamond,
        ),
      )
    } catch (error) {
      console.error("Error toggling sale status:", error)
      setError("Failed to update diamond sale status. Please try again.")
    }
  }

  if (loading) return <div className="loading">Loading your diamonds...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="container my-listing">
      <h2>My Diamonds</h2>
      {myDiamonds.length === 0 ? (
        <p>You don't have any diamonds yet.</p>
      ) : (
        <ul className="diamond-list">
          {myDiamonds.map((diamond) => (
            <li key={diamond.id} className="diamond-item">
              <h3>{diamond.name}</h3>
              <p>Price: {diamond.price} ETH</p>
              <p>Certificate Hash: {diamond.certificateHash.substring(0, 20)}...</p>
              <p className={diamond.isForSale ? "text-success" : "text-warning"}>
                Status: {diamond.isForSale ? "For Sale" : "Not For Sale"}
              </p>
              <button
                onClick={() => handleToggleSale(diamond.id, diamond.isForSale)}
                className={`toggle-sale-btn ${diamond.isForSale ? "btn-warning" : "btn-success"}`}
              >
                {diamond.isForSale ? "Remove from Sale" : "Put on Sale"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyListing