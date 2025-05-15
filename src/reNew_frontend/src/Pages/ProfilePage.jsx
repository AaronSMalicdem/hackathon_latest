import React, { useState, useEffect } from 'react';
import './ProfilePage.scss';

// Mock profile data (replace with backend fetch)
const mockProfile = {
  name: 'John Doe',
  department: 'Math',
  email: 'john.doe@university.edu',
  phone: '(123) 456-7890',
  classes: ['Algebra', 'Calculus'],
  weeklyHours: 20,
  duties: ['Math Club Advisor'],
};

function ProfilePage() {
  const [profile, setProfile] = useState(mockProfile);
  const isAdmin = true; // Replace with auth logic (e.g., from context)
  const isSelf = true; // Assume user is viewing their own profile (replace with auth)

  // Placeholder for backend fetch
  useEffect(() => {
    // TODO: Fetch profile from Motoko canister using @dfinity/agent
    // Example:
    // const fetchProfile = async () => {
    //   const actor = await createActor(canisterId, idlFactory);
    //   const data = await actor.getTeacherProfile();
    //   setProfile(data);
    // };
    // fetchProfile();
  }, []);

  // Mock edit action
  const handleEdit = () => {
    alert(`Editing profile for ${profile.name}`);
    // TODO: Open modal or navigate to edit form
  };

  return (
    <div className="profile-page">
      <h1>Teacher Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
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
    </div>
  );
}

export default ProfilePage;