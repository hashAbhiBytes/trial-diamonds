import React, { useState } from 'react';

function NumberInput() {
  const [value, setValue] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '20px',
      }}
    >
      <label htmlFor="numberInput" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Enter the amount of the diamond:
      </label>
      <input
        id="numberInput"
        type="number"
        value={value}
        onChange={handleChange}
        style={{
          padding: '10px',
          width: '200px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      {value && (
        <p style={{ marginTop: '10px' }}>You entered: {value}</p>
      )}
    </div>
    </>
  );
}

export default NumberInput;
