

import React, { useState } from "react";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          style={styles.input}
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(isHovered ? styles.buttonHover : {}),
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Search
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff", // Default color: white
    backgroundColor: "#000", // Black background
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "color 0.3s, background-color 0.3s", // Smooth transitions
  },
  buttonHover: {
   
    color: "#A6BCC9",
  },
};

export default SearchBar;
