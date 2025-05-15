import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './StudentTask.scss';

const StudentTask = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Algebra Quiz',
      dueDate: '05/20/2025',
      section: 'Math 101 - Section A',
      description: 'Complete the quiz on linear equations.',
      priority: 'High',
      type: 'Exam',
    },
    {
      id: 2,
      title: 'Calculus Assignment',
      dueDate: '05/22/2025',
      section: 'Math 102 - Section B',
      description: 'Solve problems on derivatives.',
      priority: 'Medium',
      type: 'Assignment',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    section: '',
    description: '',
    priority: 'Low',
    type: 'Assignment',
  });

  const handleAddTask = (type) => {
    setNewTask({ ...newTask, type });
    setModalMode('create');
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleEditTask = (task) => {
    setNewTask({ ...task });
    setCurrentTaskId(task.id);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSaveTask = () => {
    if (!newTask.title || !newTask.dueDate || !newTask.section || !newTask.description) {
      alert('Please fill in all required fields.');
      return;
    }

    if (modalMode === 'create') {
      const task = {
        id: tasks.length + 1,
        ...newTask,
      };
      setTasks([...tasks, task]);
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === currentTaskId ? { ...newTask, id: currentTaskId } : task
        )
      );
    }

    setNewTask({
      title: '',
      dueDate: '',
      section: '',
      description: '',
      priority: 'Low',
      type: 'Assignment',
    });
    setCurrentTaskId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="student-task-page">
      <Sidebar />
      <div className="page-container">
        <div className="header">
          <h2 className="page-title">Manage Student Tasks</h2>
          <div className="relative">
            <button
              className="add-task-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              + Add Task
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleAddTask('Assignment')}>
                  Add Assignment
                </button>
                <button onClick={() => handleAddTask('Activity')}>
                  Add Activity
                </button>
                <button onClick={() => handleAddTask('Exam')}>
                  Add Exam
                </button>
                <button onClick={() => handleAddTask('Announcement')}>
                  Add Announcement
                </button>
              </div>
            )}
          </div>
        </div>

        <section className="tasks-section">
          <h3 className="tasks-title">Tasks List</h3>
          <div className="tasks-container">
            {tasks.length === 0 ? (
              <p>No tasks available.</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card task-card--${task.type.toLowerCase()}`}
                >
                  <div className="task-header">
                    <h4 className="task-title">{task.title}</h4>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditTask(task)}
                    >
                      ✏️
                    </button>
                  </div>
                  <p className="task-detail">
                    <strong>Type:</strong> {task.type}
                  </p>
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
              ))
            )}
          </div>
        </section>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{modalMode === 'create' ? `Create ${newTask.type}` : `Edit ${newTask.type}`}</h3>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Due Date *</label>
                <input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Section *</label>
                <input
                  type="text"
                  value={newTask.section}
                  onChange={(e) =>
                    setNewTask({ ...newTask, section: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newTask.type}
                  onChange={(e) =>
                    setNewTask({ ...newTask, type: e.target.value })
                  }
                >
                  <option value="Assignment">Assignment</option>
                  <option value="Activity">Activity</option>
                  <option value="Exam">Exam</option>
                  <option value="Announcement">Announcement</option>
                </select>
              </div>
              <div className="modal-actions">
                <button onClick={handleSaveTask}>
                  {modalMode === 'create' ? 'Save' : 'Update'}
                </button>
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTask;