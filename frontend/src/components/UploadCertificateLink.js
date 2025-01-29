

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
    <div style={styles.container}>
      <h3 style={styles.title}>Upload Certificate Link</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="certificateLink" style={styles.label}>
          Enter Certificate Link (PDF/Image):
        </label>
        <input
          id="certificateLink"
          type="url"
          placeholder="e.g., https://example.com/certificate.pdf"
          value={certificateLink}
          onChange={(e) => setCertificateLink(e.target.value)}
          style={{
            ...styles.input,
            border: `1px solid ${isValid ? '#ced4da' : '#e63946'}`,
          }}
        />
        {!isValid && <span style={styles.error}>Invalid URL. Use .pdf, .jpg, .jpeg, or .png.</span>}
        <button type="submit" style={styles.button}>
          Upload
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '280px',
    margin: '50px auto',
  },
  title: {
    marginBottom: '15px',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#495057',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
  },
  label: {
    fontWeight: '500',
    fontSize: '0.9rem',
    color: '#495057',
    textAlign: 'center',
  },
  input: {
    padding: '8px',
    width: '100%',
    maxWidth: '250px',
    fontSize: '0.85rem',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    outline: 'none',
  },
  error: {
    fontSize: '0.75rem',
    color: '#e63946',
    marginTop: '-5px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default UploadCertificateLink;
