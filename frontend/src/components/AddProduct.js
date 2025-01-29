import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { uploadToIPFS } from "../utils/ipfs";
import { addProductToBlockchain } from "../utils/web3";
import UploadImg from "./UploadImg";
import UploadCertificateLink from "./UploadCertificateLink";

function AddProduct({ account, isWalletConnected }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    certificateLink: ""
  });

  const handleImageUpload = async (file) => {
    try {
      const ipfsUrl = await uploadToIPFS(file);
      setFormData(prev => ({ ...prev, image: ipfsUrl }));
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await addProductToBlockchain({
        ...formData,
        price: ethers.parseEther(formData.price.toString())
      });
      toast.success("Product added successfully!");
      navigate("/my-listings");
    } catch (error) {
      toast.error("Failed to add product");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="add-product">
      <h2>Add New Diamond</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Price (ETH):</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            step="0.001" 
            required 
          />
        </div>
        <UploadImg onImageUpload={handleImageUpload} />
        <UploadCertificateLink 
          onCertificateUpload={(url) => 
            setFormData(prev => ({ ...prev, certificateLink: url }))
          }
        />
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isLoading || !isWalletConnected}
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}