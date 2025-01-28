import React, { useState } from "react"
import './style.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import MyListing from "./components/MyListing"
import Explore from "./components/Explore"
import AddProduct from "./components/AddProduct"
import SearchBar from "./components/SearchBar"

function App() {
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async (query) => {
    try {
      console.log("Searching for:", query)
      setSearchResults([])
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  return (
    <Router>
      <div className="App">
        <NavBar />
        <SearchBar placeholder="Search diamonds..." onSearch={handleSearch} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my" element={<MyListing />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/add" element={<AddProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App