import React, { useState } from 'react'
import { ethers } from 'ethers'
import { connectToMetaMask, getDiamondContract } from '../utils/web3'
import { uploadToIPFS } from '../utils/ipfs'

function AddProduct() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    certification: '',
    image: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      e.target.value = ''
      return
    }
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsRegistering(true)

    try {
      // Upload image to IPFS
      setUploadProgress('Uploading image to IPFS...')
      const imageUrl = await uploadToIPFS(formData.image)
      
      // Connect to MetaMask and get contract
      setUploadProgress('Connecting to wallet...')
      const signer = await connectToMetaMask()
      const contract = await getDiamondContract(signer)

      // Register diamond on blockchain
      setUploadProgress('Registering diamond on blockchain...')
      const tx = await contract.registerDiamond(
        formData.name,
        ethers.utils.parseEther(formData.price),
        formData.certification,
        imageUrl
      )

      setUploadProgress('Waiting for transaction confirmation...')
      await tx.wait()
      
      alert('Diamond registered successfully!')
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        certification: '',
        image: null
      })
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) fileInput.value = ''
      
    } catch (error) {
      console.error('Error registering diamond:', error)
      alert('Error registering diamond: ' + error.message)
    } finally {
      setIsRegistering(false)
      setUploadProgress('')
    }
  }

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={isRegistering}
          />
        </div>
        <div className="form-group">
          <label>Price (ETH):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            step="0.001"
            min="0"
            disabled={isRegistering}
          />
        </div>
        <div className="form-group">
          <label>Certification:</label>
          <input
            type="text"
            name="certification"
            value={formData.certification}
            onChange={handleInputChange}
            required
            disabled={isRegistering}
          />
        </div>
        <div className="form-group">
          <label>Image (max 5MB):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            disabled={isRegistering}
          />
        </div>
        {uploadProgress && (
          <div className="upload-progress">
            {uploadProgress}
          </div>
        )}
        <button 
          type="submit" 
          disabled={isRegistering}
          className={`submit-button ${isRegistering ? 'loading' : ''}`}
        >
          {isRegistering ? 'Processing...' : 'Register Diamond'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct