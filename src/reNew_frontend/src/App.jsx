import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import WorkloadsPage from './Pages/WorkloadsPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { RegisterForm } from './Pages/Registration';
import ProfilePage from './Pages/ProfilePage';
import PersonalWork from './Pages/PersonalWork';
import StudentTask from './Pages/StudentTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workloads"
            element={
              <ProtectedRoute>
                <WorkloadsPage />
              </ProtectedRoute>
            }
          />  <Route
            path="/personalworks"
            element={
              <ProtectedRoute>
                <PersonalWork />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
            <Route
            path="/studenttask"
            element={
              <ProtectedRoute>
                <StudentTask />
              </ProtectedRoute>
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;