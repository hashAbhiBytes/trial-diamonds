import React from 'react'
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <>
   <div className="card"  style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',marginLeft: '100px', 
        marginRight: '100px',
        padding:'20px',
        margin:'20px'
        }}>
  
  <div className="card-body"  >
    <h2 className="card-title">Add a diamond</h2>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    <Link to="/add" className="btn btn-primary stretched-link">Continue</Link>
  </div>
  </div>
</>
    
  )
}
