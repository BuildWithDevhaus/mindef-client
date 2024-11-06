import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
