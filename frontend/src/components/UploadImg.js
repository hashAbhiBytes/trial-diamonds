// import React, { useState } from 'react';

// function UploadImg() {
//   const [image, setImage] = useState(null); // Store the uploaded image
//   const [preview, setPreview] = useState(null); // Store the image preview

//   // Handle file selection
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file)); // Create a preview URL for the image
//     } else {
//       alert('Please upload a valid image file.');
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//     setPreview(null);
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         backgroundColor: '#f8f9fa',
//       }}
//     >
//       <h2>Upload an Image</h2>
//       <input
//         type="file"
//         accept="image/*" // Accepts only image files
//         onChange={handleImageUpload}
//         style={{ margin: '10px 0' }}
//       />
//       {preview && (
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: '10px',
//           }}
//         >
//           <img
//             src={preview}
//             alt="Uploaded Preview"
//             style={{
//               width: '200px',
//               height: '200px',
//               objectFit: 'cover',
//               borderRadius: '10px',
//               marginBottom: '10px',
//             }}
//           />
//           <button
//             onClick={handleRemoveImage}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#dc3545',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             Remove Image
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadImg;
import React, { useState } from 'react';

function UploadImg() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Upload Image</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.input} />
      {preview && (
        <div style={styles.previewContainer}>
          <img src={preview} alt="Preview" style={styles.image} />
          <button onClick={handleRemoveImage} style={styles.removeButton}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    margin: '20px auto',
    marginTop:'50px',
    marginBottom:'50px',
  },
  title: {
    marginBottom: '10px',
    fontSize: '1.25rem',
    color: '#333',
  },
  input: {
    marginBottom: '30px',
    padding: '5px',
    fontSize: '0.9rem',
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
};

export default UploadImg;

