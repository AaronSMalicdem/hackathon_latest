import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/reNew_backend/reNew_backend.did.js';
import '../index.scss';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const agent = new HttpAgent({ host: process.env.DFX_NETWORK === 'ic' ? 'https://icp0.io' : 'http://localhost:4943' });
      if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
      }
      const canisterId = process.env.RENEW_BACKEND_CANISTER_ID || 'uxrrr-q7777-77774-qaaaq-cai';
      const actor = Actor.createActor(idlFactory, { agent, canisterId });

      const result = await actor.login(username, password);
      if (result.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        setMessage(result.ok);
        navigate('/home');
      } else {
        setMessage(result.err);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to your account</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p className="signup-link">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export { LoginForm };