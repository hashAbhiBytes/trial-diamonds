// import React, { useState } from 'react';

// function NumberInput() {
//   const [value, setValue] = useState('');

//   // Handle input change
//   const handleChange = (e) => {
//     const newValue = e.target.value;
//     setValue(newValue);
//   };

//   return (
//     <>
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         margin: '20px',
//       }}
//     >
//       <label htmlFor="numberInput" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
//         Enter the amount of the diamond:
//       </label>
//       <input
//         id="numberInput"
//         type="number"
//         value={value}
//         onChange={handleChange}
//         style={{
//           padding: '10px',
//           width: '200px',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//         }}
//       />
//       {value && (
//         <p style={{ marginTop: '10px' }}>You entered: {value}</p>
//       )}
//     </div>
//     </>
//   );
// }

// export default NumberInput;


import React, { useState } from 'react';

function NumberInput() {
  const [value, setValue] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div style={styles.container}>
      <label htmlFor="numberInput" style={styles.label}>
        Enter the amount of the diamond:
      </label>
      <input
        id="numberInput"
        type="number"
        value={value}
        onChange={handleChange}
        style={styles.input}
        placeholder="Enter amount"
      />
      {value && <p style={styles.output}>You entered: {value}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#333',
  },
  input: {
    padding: '8px',
    width: '100%',
    fontSize: '0.95rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  output: {
    marginTop: '10px',
    fontSize: '0.9rem',
    color: '#555',
  },
};

export default NumberInput;
