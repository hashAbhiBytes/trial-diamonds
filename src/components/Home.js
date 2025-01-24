
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh',
      margin: '0 auto',
      padding: '20px',
    }}>
      <div className="card" style={{
        maxWidth: '400px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundColor: '#fff',
      }}>
        <div className="card-body" style={{
          textAlign: 'center',
        }}>
          <h2 className="card-title" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#333',
          }}>Add a Diamond</h2>
          <Link to="/add" className="btn btn-primary stretched-link" style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '5px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
