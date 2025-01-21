import React, { useState } from 'react';

function UploadCertificateLink() {
  const [certificateLink, setCertificateLink] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Validate URL function
  const validateURL = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return !!urlPattern.test(url) && /\.(pdf|jpg|jpeg|png)$/i.test(url); // Restrict to PDF or image extensions
  };

  // Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateURL(certificateLink)) {
      setIsValid(true);
      alert(`Certificate link uploaded: ${certificateLink}`);
    } else {
      setIsValid(false);
    }
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
      <h2>Upload Certificate Link</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <label htmlFor="certificateLink" style={{ fontWeight: 'bold' }}>
          Enter Certificate Link (PDF/Image):
        </label>
        <input
          id="certificateLink"
          type="url"
          placeholder="e.g., https://example.com/certificate.pdf"
          value={certificateLink}
          onChange={(e) => setCertificateLink(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            border: `1px solid ${isValid ? '#ccc' : 'red'}`,
            borderRadius: '5px',
          }}
        />
        {!isValid && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            Please enter a valid URL ending with .pdf, .jpg, .jpeg, or .png.
          </span>
        )}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadCertificateLink;
