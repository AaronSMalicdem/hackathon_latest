import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/reNew_backend/reNew_backend.did.js';
import '../index.scss';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
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

      const result = await actor.register(username, name, course, parseInt(age, 10), password);
      if (result.ok) {
        setMessage(result.ok);
        navigate('/login');
      } else {
        setMessage(result.err);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create Account</h2>
        <p className="login-subtitle">Register Here</p>
        <form onSubmit={handleRegister} className="login-form" autoComplete="off">
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
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter your name"
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="course">
              Course
            </label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="form-input"
              placeholder="Enter your course"
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-input"
              placeholder="Enter your age"
              required
              disabled={isLoading}
              autoComplete="off"
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
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Register'}
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p className="signup-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export { RegisterForm };