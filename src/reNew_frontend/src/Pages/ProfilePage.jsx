import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/reNew_backend/reNew_backend.did.js';
import profileIcon from '../images/profile.png';
import './ProfilePage.scss';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const isAdmin = true; // Replace with auth logic
  const isSelf = true; // Assume user is viewing their own profile

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile...');
        const username = localStorage.getItem('username') || 'Unknown User';
        console.log('Username:', username);

        const agent = new HttpAgent({ host: process.env.DFX_NETWORK === 'ic' ? 'https://icp0.io' : 'http://localhost:4943' });
        console.log('Agent host:', agent.host);

        if (process.env.DFX_NETWORK !== 'ic') {
          console.log('Fetching root key...');
          await agent.fetchRootKey();
          console.log('Root key fetched');
        }

        const canisterId = process.env.RENEW_BACKEND_CANISTER_ID || 'uxrrr-q7777-77774-qaaaq-cai';
        const actor = Actor.createActor(idlFactory, { agent, canisterId });
        console.log('Actor created for canister:', canisterId);

        const result = await actor.getProfile(username);
        console.log('Profile result:', result);

        if ('ok' in result) {
          const user = result.ok;
          setProfile({
            name: user.name,
            department: user.course,
            email: `${username.toLowerCase()}@university.edu`,
            phone: '(123) 456-7890',
            classes: [user.course],
            weeklyHours: 20,
            duties: ['Department Advisor'],
          });
        } else {
          setError(`Failed to load profile: ${result.err}`);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err.message, err.stack);
        setError(`Failed to load profile: ${err.message}`);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Open modal and populate form
  const handleEdit = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        department: profile.department,
        email: profile.email,
        phone: profile.phone,
        classes: profile.classes.join(', '),
        weeklyHours: profile.weeklyHours,
        duties: profile.duties.join(', '),
      });
      setIsModalOpen(true);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({
      name: formData.name,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      classes: formData.classes.split(',').map((c) => c.trim()),
      weeklyHours: parseInt(formData.weeklyHours, 10),
      duties: formData.duties ? formData.duties.split(',').map((d) => d.trim()) : [],
    });
    setIsModalOpen(false);
    setFormData(null);
  };

  // Close modal without saving
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(null);
  };

  return (
    <div className="profile-page">
      <h1>Teacher Profile</h1>
      {loading ? (
        <p>Loading profile...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : profile ? (
        <>
          <div className="profile-card">
            <div className="profile-header">
              <img src={profileIcon} alt="User Icon" className="user-icon" />
              <h2 className="profile-name">{profile.name}</h2>
              <span className="profile-department">{profile.department}</span>
            </div>
            <div className="profile-body">
              <div className="profile-section">
                <h3>Personal Information</h3>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Phone:</strong> {profile.phone}
                </p>
              </div>
              <div className="profile-section">
                <h3>Workload Summary</h3>
                <p>
                  <strong>Classes:</strong> {profile.classes.join(', ')}
                </p>
                <p>
                  <strong>Weekly Hours:</strong> {profile.weeklyHours}
                </p>
                <p>
                  <strong>Duties:</strong>{' '}
                  {profile.duties.length > 0 ? profile.duties.join(', ') : 'None'}
                </p>
              </div>
            </div>
            {(isAdmin || isSelf) && (
              <div className="profile-actions">
                <button className="edit-button" onClick={handleEdit}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit} className="edit-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="classes">Classes (comma-separated)</label>
                    <input
                      type="text"
                      id="classes"
                      name="classes"
                      value={formData.classes}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="weeklyHours">Weekly Hours</label>
                    <input
                      type="number"
                      id="weeklyHours"
                      name="weeklyHours"
                      value={formData.weeklyHours}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duties">Duties (comma-separated)</label>
                    <input
                      type="text"
                      id="duties"
                      name="duties"
                      value={formData.duties}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                      Cancel
                    </button>
                    <button type="submit" className="save-button">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
}

export default ProfilePage;