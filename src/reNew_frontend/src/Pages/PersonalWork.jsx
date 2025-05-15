import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './PersonalWork.scss';

// Mock workloads for the logged-in teacher
const generateMockWorkloads = (teacherName) => [
  {
    id: '1',
    name: teacherName,
    department: 'Math',
    classes: ['Algebra I'],
    weeklyHours: 4,
    duties: ['Math Club'],
    isComplete: false,
  },
  {
    id: '2',
    name: teacherName,
    department: 'Math',
    classes: ['Calculus'],
    weeklyHours: 5,
    duties: [],
    isComplete: false,
  },
  {
    id: '3',
    name: teacherName,
    department: 'Science',
    classes: ['Physics'],
    weeklyHours: 4,
    duties: ['Lab Prep'],
    isComplete: false,
  },
  {
    id: '4',
    name: teacherName,
    department: 'Science',
    classes: ['Chemistry'],
    weeklyHours: 4,
    duties: [],
    isComplete: false,
  },
  {
    id: '5',
    name: teacherName,
    department: 'English',
    classes: ['Literature'],
    weeklyHours: 3,
    duties: ['Book Club'],
    isComplete: false,
  },
  {
    id: '6',
    name: teacherName,
    department: 'English',
    classes: ['Writing'],
    weeklyHours: 3,
    duties: [],
    isComplete: false,
  },
  {
    id: '7',
    name: teacherName,
    department: 'History',
    classes: ['World History'],
    weeklyHours: 4,
    duties: ['Debate Team'],
    isComplete: false,
  },
  {
    id: '8',
    name: teacherName,
    department: 'History',
    classes: ['US History'],
    weeklyHours: 4,
    duties: [],
    isComplete: false,
  },
  {
    id: '9',
    name: teacherName,
    department: 'Art',
    classes: ['Drawing'],
    weeklyHours: 2,
    duties: ['Art Show'],
    isComplete: false,
  },
  {
    id: '10',
    name: teacherName,
    department: 'Physical Education',
    classes: ['Gym'],
    weeklyHours: 3,
    duties: ['Sports Coach'],
    isComplete: false,
  },
];

function PersonalWork() {
  // Fetch teacher's name from localStorage
  const [teacherName, setTeacherName] = useState('Teacher');
  useEffect(() => {
    const username = localStorage.getItem('username') || 'Teacher';
    setTeacherName(username);
  }, []);

  // Initialize workloads
  const [workloads, setWorkloads] = useState(generateMockWorkloads(teacherName));
  const [nftMessages, setNftMessages] = useState({});

  // Update workloads when teacherName changes
  useEffect(() => {
    setWorkloads(generateMockWorkloads(teacherName));
  }, [teacherName]);

  // Handle workload completion
  const handleComplete = (id) => {
    setWorkloads((prev) =>
      prev.map((workload) =>
        workload.id === id ? { ...workload, isComplete: true } : workload
      )
    );
    setNftMessages((prev) => ({
      ...prev,
      [id]: `NFT Earned for completing ${id}!`,
    }));
  };

  return (
    <div className="personal-work-page">
      <h1>My Workloads</h1>
      <p className="nft-info">
        Complete each workload to earn a unique NFT coin as a reward!
      </p>

      <div className="workload-grid">
        {workloads.map((workload) => (
          <div key={workload.id} className="workload-card">
            <div className="card-header">
              <h3 className="card-title">{workload.department}</h3>
            </div>
            <div className="card-body">
              <p>
                <strong>Class:</strong> {workload.classes.join(', ')}
              </p>
              <p>
                <strong>Hours:</strong> {workload.weeklyHours}
              </p>
              <p>
                <strong>Duties:</strong>{' '}
                {workload.duties.length > 0 ? workload.duties.join(', ') : 'None'}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {workload.isComplete ? 'Completed' : 'In Progress'}
              </p>
            </div>
            <div className="card-actions">
              {!workload.isComplete && (
                <button
                  onClick={() => handleComplete(workload.id)}
                  className="complete-button"
                >
                  Mark as Complete
                </button>
              )}
              {nftMessages[workload.id] && (
                <div className="nft-coin-container">
                  <img
                    src="https://img.icons8.com/emoji/48/coin-emoji.png"
                    alt="NFT Coin"
                    className="nft-coin"
                  />
                  <p className="nft-message">{nftMessages[workload.id]}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="back-section">
        <NavLink to="/workloads" className="back-link">
          Back to Workloads
        </NavLink>
      </div>
    </div>
  );
}

export default PersonalWork;