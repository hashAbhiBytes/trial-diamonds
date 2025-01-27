import React, { useState } from "react"
import { addDiamond, formatTransactionError } from "./Ethers"
import UploadImg from "./UploadImg"
import NumberInput from "./NumberInput"
import UploadCertificateLink from "./UploadCertificateLink"

export default function AddProduct() {
  const [diamondName, setDiamondName] = useState("")
  const [price, setPrice] = useState("")
  const [certificateHash, setCertificateHash] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSave = async () => {
    if (!diamondName || !price || !certificateHash) {
      setError("Please fill in all the fields before saving!")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const tx = await addDiamond(diamondName, price, certificateHash)
      await tx.wait()
      alert("Diamond added successfully to the blockchain!")

      // Reset form fields
      setDiamondName("")
      setPrice("")
      setCertificateHash("")
    } catch (error) {
      console.error("Error adding diamond:", error)
      setError(formatTransactionError(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="add-product">
      <h2>Add New Diamond</h2>
      <UploadCertificateLink onUpload={setCertificateHash} />
      <NumberInput label="Price (ETH)" onInputChange={setPrice} />
      <UploadImg onUpload={setDiamondName} />
      {error && <div className="error">{error}</div>}
      <div className="button-group">
        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setDiamondName("")
            setPrice("")
            setCertificateHash("")
            setError(null)
          }}
        >
          Discard
        </button>
      </div>
    </div>
  )
}
