import React, { useState } from 'react';
import { connectWallet } from './MetaMaskConnect';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleWalletLogin = async () => {
    try {
      const { address } = await connectWallet();
      // Send address to backend for authentication
      const response = await fetch('/api/auth/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      if (response.ok) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleWalletLogin}>Connect with MetaMask</button>
    </div>
  );
};

export default Login;