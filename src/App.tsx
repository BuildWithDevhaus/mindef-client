import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import PrivateRoute from "./components/organisms/PrivateRoute";
import AdminReturn from "./components/pages/AdminReturnUniform";
import AdminRegisterInventory from "./components/pages/AdminRegisterInventory";
import AdminAddRegisterInventory from "./components/pages/AdminAddRegisterInventory";
import AdminDeleteInventory from "./components/pages/AdminDeleteInventory";
import AdminDeleteReasons from "./components/pages/AdminDeleteReasons";
import AdminUnitWing from "./components/pages/AdminUnitWing";
import AdminConfigureDataRetention from "./components/pages/AdminConfigureDataRetention";
import AdminHome from "./components/pages/AdminHome";
import AdminReports from "./components/pages/AdminReports";
import UserHome from "./components/pages/UserHome";
import AdminMonthlyReport from "./components/pages/AdminMonthlyReport";
import AdminYearlyReport from "./components/pages/AdminYearlyReport";
import AdminAutoMeasurement from "./components/pages/AdminAutoMeasurement";
import AdminManualMeasurement from "./components/pages/AdminManualMeasurement";
import AdminDrawUniform from "./components/pages/AdminDrawUniform";
import AdminLogin from "./components/pages/AdminLogin";
import AdminAddDeleteReason from "./components/pages/AdminAddDeleteReason";
import AdminAddUnitWing from "./components/pages/AdminAddUnitWing";
import AdminAddDeleteInventory from "./components/pages/AdminAddDeleteInventory";

const App = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserHome />} />
        <Route path="/admin/login" element={<AdminLogin onLogin={login} />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminHome />} />}
        />
        <Route
          path="/admin/return-uniform"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminReturn />} />}
        />
        <Route
          path="/admin/register-inventory"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminRegisterInventory />} />}
        />
        <Route
          path="/admin/register-inventory/add"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminAddRegisterInventory />} />}
        />
        <Route
          path="/admin/delete-inventory"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminDeleteInventory />} />}
        />
        <Route
          path="/admin/delete-inventory/add"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminAddDeleteInventory />} />}
        />
        <Route
          path="/admin/delete-reasons"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminDeleteReasons />} />}
        />
        <Route
          path="/admin/delete-reasons/add"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminAddDeleteReason />} />}
        />
        <Route
          path="/admin/reports"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminReports />} />}
        />
        <Route
          path="/admin/unit-wing"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminUnitWing />} />}
        />
        <Route
          path="/admin/unit-wing/add"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminAddUnitWing />} />}
        />
        <Route
          path="/admin/configure-data-retention"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminConfigureDataRetention />} />}
        />
        <Route
          path="/admin/reports/monthly-report"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminMonthlyReport />} />}
        />
        <Route
          path="/admin/reports/yearly-report"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminYearlyReport />} />}
        />
        <Route
          path="/admin/auto-measurement"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminAutoMeasurement />} />}
        />
        <Route
          path="/admin/manual-measurement"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminManualMeasurement />} />}
        />
        <Route
          path="/admin/draw-uniform"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminDrawUniform />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
