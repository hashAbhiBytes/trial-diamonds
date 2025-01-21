import React, { useState } from 'react';

function UploadImg() {
  const [image, setImage] = useState(null); // Store the uploaded image
  const [preview, setPreview] = useState(null); // Store the image preview

  // Handle file selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the image
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
      }}
    >
      <h2>Upload an Image</h2>
      <input
        type="file"
        accept="image/*" // Accepts only image files
        onChange={handleImageUpload}
        style={{ margin: '10px 0' }}
      />
      {preview && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <img
            src={preview}
            alt="Uploaded Preview"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '10px',
              marginBottom: '10px',
            }}
          />
          <button
            onClick={handleRemoveImage}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadImg;

