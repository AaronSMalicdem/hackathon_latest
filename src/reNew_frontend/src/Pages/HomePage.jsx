import React, { useState } from 'react';
import './HomePage.scss';


const HomePage = () => {
  // State for student attendance records
  const [studentAttendance, setStudentAttendance] = useState([
    { name: 'John Doe', date: '05/10/2025', status: 'Present' },
    { name: 'Jane Smith', date: '05/10/2025', status: 'Absent' },
    { name: 'Alex Johnson', date: '05/11/2025', status: 'Present' },
  ]);

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    age: '',
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // Faculty attendance (unchanged)
  const facultyAttendance = [
    { name: 'Dr. Emily Brown', date: '05/10/2025', status: 'Present' },
    { name: 'Prof. Michael Lee', date: '05/10/2025', status: 'Present' },
    { name: 'Ms. Sarah Davis', date: '05/11/2025', status: 'Absent' },
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.age || formData.age <= 0) newErrors.age = 'Valid age is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Mock submission: Add to studentAttendance
      const newRecord = {
        name: formData.name,
        date: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }),
        status: 'Present', // Default status
      };
      setStudentAttendance((prev) => [...prev, newRecord]);
      // Reset form
      setFormData({ name: '', course: '', age: '' });
      setErrors({});
      // TODO: Call Motoko backend to store attendance
      // Example: actor.logAttendance({ name, course, age, date, status });
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Attendance Dashboard</h2>
      <p className="page-subtitle">Track attendance for students and faculty.</p>

      {/* Student Attendance Form */}
      <section className="attendance-section">
        <h3 className="attendance-title">Log Student Attendance</h3>
        <form className="attendance-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="Enter student name "
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="course">Course </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className={errors.course ? 'input-error' : ''}
              placeholder="Enter course name "
            />
            {errors.course && <span className="error-message">{errors.course}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="age">Age </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className={errors.age ? 'input-error' : ''}
              placeholder="Enter age "
              min="1"
           
           />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>
          <button type="submit" className="submit-button">
            Log Attendance
          </button>
        </form>
      </section>

      {/* Student Attendance Table */}
      <section className="attendance-section">
        <h3 className="attendance-title">Student Attendance</h3>
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
      </section>

      {/* Faculty Attendance Table */}
      <section className="attendance-section">
        <h3 className="attendance-title">Faculty Attendance</h3>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {facultyAttendance.map((record, index) => (
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
      </section>

      <p className="page-link">
        <a href="/profile">Go to Profile</a>
      </p>
    </div>
  );
};

export default HomePage;