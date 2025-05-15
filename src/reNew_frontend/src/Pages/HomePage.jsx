import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/reNew_backend/reNew_backend.did.js';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ethers } from 'ethers';
import NftImage from '../images/nft.png'; // Import NFT coin image
import './HomePage.scss';

const HomePage = () => {
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [walletError, setWalletError] = useState('');

  // Mock data for teacher's attendance
  const currentDate = new Date(2025, 4, 15);
  const daysInMonth = new Date(2025, 5, 0).getDate();
  const teacherAttendance = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    present: Math.random() > 0.3,
  }));
  const totalPoints = teacherAttendance.filter(day => day.present).length * 10;

  const tasks = [
    {
      id: 1,
      title: 'Algebra Quiz',
      dueDate: '05/20/2025',
      section: 'Math 101 - Section A',
      description: 'Complete the quiz on linear equations.',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Calculus Assignment',
      dueDate: '05/22/2025',
      section: 'Math 102 - Section B',
      description: 'Solve problems on derivatives.',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Geometry Project',
      dueDate: '05/25/2025',
      section: 'Math 103 - Section C',
      description: 'Create a model of geometric shapes.',
      priority: 'Low',
    },
  ];

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setWalletError('MetaMask is not installed. Please install it to connect.');
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      setWalletAddress(address);
      setWalletError('');
      const balance = await provider.getBalance(address);
      console.log('Balance:', ethers.formatEther(balance), 'ETH');
    } catch (err) {
      console.error('Wallet connection error:', err);
      setWalletError('Failed to connect wallet. Please try again.');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const agent = new HttpAgent({ host: process.env.DFX_NETWORK === 'ic' ? 'https://icp0.io' : 'http://localhost:4943' });
        if (process.env.DFX_NETWORK !== 'ic') {
          await agent.fetchRootKey();
        }
        const canisterId = process.env.RENEW_BACKEND_CANISTER_ID || 'uxrrr-q7777-77774-qaaaq-cai';
        const actor = Actor.createActor(idlFactory, { agent, canisterId });

        const users = await actor.getAllUsers();
        const attendanceRecords = users.map((user) => ({
          name: user.name,
          date: new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          }),
          status: 'Present',
        }));
        setStudentAttendance(attendanceRecords);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Generate calendar days
  const renderCalendar = () => {
    const firstDayOfMonth = new Date(2025, 4, 1).getDay();
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    teacherAttendance.forEach(({ day, present }) => {
      const isToday = day === currentDate.getDate();
      days.push(
        <div
          key={day}
          className={`calendar-day ${present ? 'present' : ''} ${isToday ? 'today' : ''}`}
        >
          <span className="day-number">{day}</span>
          {present && <span className="checkmark">✔</span>}
        </div>
      );
    });
    return days;
  };

  return (
    <div className="home-page">
      <Sidebar />
      <div className="page-container">
        <h2 className="page-title">General Dashboard</h2>
        {/* <p className="page-subtitle">Track attendance for students and your own attendance.</p> */}
        {/* Wallet Connection Section */}
        <section className="wallet-section">
          <h3 className="wallet-title">Connect Wallet</h3>
          <div className="wallet-content">
            {walletAddress ? (
              <p className="wallet-address">
                Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            ) : (
              <button className="wallet-button" onClick={connectWallet}>
                Connect MetaMask
              </button>
            )}
            <div className="wallet-value">
              <img src={NftImage} alt="NFT Coin" className="nft-coin" />
              <span>1000</span>
            </div>
          </div>
          {walletError && <p className="error-message">{walletError}</p>}
        </section>
        <section className="tasks-section">
          <h3 className="tasks-title">Ongoing Student Tasks</h3>
          <div className="tasks-container">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`task-card task-card--${task.priority.toLowerCase()}`}
              >
                <h4 className="task-title">{task.title}</h4>
                <p className="task-detail">
                  <strong>Due Date:</strong> {task.dueDate}
                </p>
                <p className="task-detail">
                  <strong>Section:</strong> {task.section}
                </p>
                <p className="task-detail">
                  <strong>Description:</strong> {task.description}
                </p>
                <p className="task-detail">
                  <strong>Priority:</strong> {task.priority}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="attendance-section">
          <h3 className="attendance-title">Student Attendance</h3>
          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : studentAttendance.length === 0 ? (
            <p>No users registered</p>
          ) : (
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentAttendance.map((record, index) => (
                  <tr key={index}>
                    <td>{record.name}</td>
                    <td>{record.date}</td>
                    <td className={record.status === 'Present' ? 'status-present' : 'status-absent'}>
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        <section className="attendance-section">
          <h3 className="attendance-title">My Attendance</h3>
          <div className="calendar-container">
            <div className="calendar-header">
              <span>May 2025</span>
              <p className="points-info">
                Total Points: {totalPoints} (Convertible to {totalPoints / 10} NFTs)
              </p>
            </div>
            <div className="calendar-grid">
              <div className="calendar-day-header">Sun</div>
              <div className="calendar-day-header">Mon</div>
              <div className="calendar-day-header">Tue</div>
              <div className="calendar-day-header">Wed</div>
              <div className="calendar-day-header">Thu</div>
              <div className="calendar-day-header">Fri</div>
              <div className="calendar-day-header">Sat</div>
              {renderCalendar()}
            </div>
          </div>
        </section>
        <p className="page-link">
          <Link to="/profile">Go to Profile</Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;