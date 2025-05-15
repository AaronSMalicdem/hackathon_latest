import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import profileImage from '../images/profile.png'; // Relative path to the image
import './Workloads.scss';

// Mock data (replace with backend fetch)
const mockWorkloads = [
  {
    teacherId: '1',
    name: 'John Doe',
    department: 'Math',
    classes: ['Algebra', 'Calculus'],
    weeklyHours: 20,
    duties: ['Math Club Advisor'],
  },
  {
    teacherId: '2',
    name: 'Jane Smith',
    department: 'Science',
    classes: ['Biology', 'Chemistry'],
    weeklyHours: 22,
    duties: ['Science Fair Coordinator'],
  },
  {
    teacherId: '3',
    name: 'Alice Johnson',
    department: 'English',
    classes: ['Literature', 'Writing'],
    weeklyHours: 18,
    duties: [],
  },
];

function WorkloadsPage() {
  const [workloads, setWorkloads] = useState(mockWorkloads);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const isAdmin = true; // Replace with actual auth logic (e.g., from context)

  // Mock departments for filter
  const departments = ['All', 'Math', 'Science', 'English'];

  // Filter and sort workloads
  const filteredWorkloads = workloads
    .filter(
      (workload) =>
        departmentFilter === 'All' || workload.department === departmentFilter
    )
    .sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (sortField === 'weeklyHours') {
        return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }
      return sortOrder === 'asc'
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    });

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Placeholder for backend fetch (to be implemented)
  useEffect(() => {
    // TODO: Fetch workloads from Motoko canister using @dfinity/agent
  }, []);

  return (
    <div className="workloads-page">
      <h1>Teacher Workloads</h1>

      {/* My Workloads Section */}
      <div className="my-workloads-section">
        <NavLink to="/personalworks" className="my-workloads-link">
          My Workloads
        </NavLink>
      </div>

      {/* Filter */}
      <div className="filter-section">
        <label htmlFor="department">Filter by Department:</label>
        <select
          id="department"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {filteredWorkloads.map((workload) => (
          <div key={workload.teacherId} className="workload-card">
            <div className="card-header">
              <img
                src={profileImage}
                alt={`${workload.name}'s profile`}
                className="profile-image"
              />
              <div className="header-content">
                <h3
                  className="card-title"
                  onClick={() => handleSort('name')}
                  data-sort="name"
                >
                  {workload.name}{' '}
                  {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </h3>
                <span className="department">{workload.department}</span>
              </div>
            </div>
            <div className="card-body">
              <p>
                <strong>Classes:</strong> {workload.classes.join(', ')}
              </p>
              <p
                onClick={() => handleSort('weeklyHours')}
                className="weekly-hours"
                data-sort="weeklyHours"
              >
                <strong>Weekly Hours:</strong> {workload.weeklyHours}{' '}
                {sortField === 'weeklyHours' && (sortOrder === 'asc' ? '↑' : '↓')}
              </p>
              <p>
                <strong>Duties:</strong>{' '}
                {workload.duties.length > 0 ? workload.duties.join(', ') : 'None'}
              </p>
            </div>
            <div className="card-actions">
              <NavLink to={`/workload/${workload.teacherId}`} className="view-link">
                View
              </NavLink>
              {isAdmin && (
                // <button
                //   onClick={() => alert(`Edit workload for ${workload.name}`)}
                //   className="edit-button"
                // >
                //   Edit
                // </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkloadsPage;