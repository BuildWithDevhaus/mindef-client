import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminReturn from './components/pages/AdminReturnUniform';
import AdminRegisterInventory from './components/pages/AdminRegisterInventory';
import AdminDeleteInventory from './components/pages/AdminDeleteInventory';
import AdminDeleteReasons from './components/pages/AdminDeleteReasons';
import AdminUnitWing from './components/pages/AdminUnitWing';
import AdminConfigureDataRetention from './components/pages/AdminConfigureDataRetention';
import AdminHome from './components/pages/AdminHome';
import AdminReports from './components/pages/AdminReports';
import UserHome from './components/pages/UserHome';
import AdminMonthlyReport from './components/pages/AdminMonthlyReport';
import AdminYearlyReport from './components/pages/AdminYearlyReport';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/admin" element={<AdminHome/>} />
        <Route path="/admin/return-uniform" element={<AdminReturn />} />
        <Route path="/admin/register-inventory" element={<AdminRegisterInventory />} />
        <Route path="/admin/delete-inventory" element={<AdminDeleteInventory />} />
        <Route path="/admin/delete-reasons" element={<AdminDeleteReasons />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path='/admin/unit-wing' element={<AdminUnitWing/>} />
        <Route path='/admin/configure-data-rentention' element={<AdminConfigureDataRetention/>} />
        <Route path="/admin/reports/monthly-report" element={<AdminMonthlyReport />} />
        <Route path='/admin/reports/yearly-report' element={<AdminYearlyReport />} />
      </Routes>
    </Router>
  );
};

export default App;
