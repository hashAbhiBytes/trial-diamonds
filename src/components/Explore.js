import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import { getContractInstance, buyDiamond } from "./Ethers"
import "./styles.css"

const Explore = () => {
  const [diamonds, setDiamonds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleBuy = async (diamond) => {
    try {
      const tx = await buyDiamond(diamond.id)
      await tx.wait()
      alert(`Successfully purchased ${diamond.name}`)

      // Refresh the diamonds list after purchase
      const updatedDiamonds = diamonds.filter((d) => d.id !== diamond.id)
      setDiamonds(updatedDiamonds)
    } catch (error) {
      console.error("Purchase failed:", error)
      alert("Failed to purchase diamond: " + error.message)
    }
  }

  useEffect(() => {
    const fetchDiamonds = async () => {
      try {
        const contract = await getContractInstance()
        const diamondCount = await contract.diamondCount()

        const diamondsArray = await Promise.all(
          Array.from({ length: diamondCount.toNumber() }, async (_, i) => {
            const diamond = await contract.getDiamond(i)
            return {
              id: i,
              name: diamond.name,
              price: ethers.formatEther(diamond.price),
              owner: diamond.owner,
              certificateHash: diamond.certificateHash,
              isForSale: diamond.isForSale,
            }
          }),
        )

        setDiamonds(diamondsArray.filter((d) => d.isForSale))
      } catch (err) {
        console.error("Failed to fetch diamonds:", err)
        setError("Failed to fetch diamonds. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchDiamonds()
  }, [])

  if (loading) return <div className="loading">Loading diamonds...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="container">
      <h2>Explore Diamonds</h2>
      <div className="diamond-list">
        {diamonds.length ? (
          diamonds.map((diamond) => (
            <div key={diamond.id} className="diamond-card">
              <h3>{diamond.name}</h3>
              <p>Price: {diamond.price} ETH</p>
              <p>Certificate: {diamond.certificateHash.substring(0, 20)}...</p>
              <button onClick={() => handleBuy(diamond)} className="btn btn-primary">
                Buy Diamond
              </button>
            </div>
          ))
        ) : (
          <p>No diamonds available for sale.</p>
        )}
      </div>
    </div>
  )
}

export default Explore

