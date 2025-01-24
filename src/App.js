
import './App.css';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Explore from './components/Explore';
import MyListing from './components/MyListing';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import SearchBar from './components/SearchBar';

function App() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Add your logic for handling the search query
  };
  return (
    <>
    <Router>
    <NavBar/>
    <SearchBar placeholder="Search for something..." onSearch={handleSearch} />
    <div className="container my-3">
      <Routes>
      <Route exact path="/"
            element={<Home/>}
          />
          <Route exact path="/add"
            element={<AddProduct/>}
          />
      <Route exact path="/explore"
            element={<Explore/>}
          />
      <Route exact path="/my"
            element={<MyListing/>}
          />
    
    </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
