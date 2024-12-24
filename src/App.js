import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AdminDoctor from "./components/AdminDoctor";
import AdminPatient from "./components/AdminPatient";
import PatientStats from "./components/PatientStats";
import DoctorStats from "./components/DoctorStats";
import WebStats from "./components/WebStats";
import AdminAppoint from "./components/AdminAppoint";
function App() {
  return (
    <Router>
      {/* Chatbot component will be visible on every page */}
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-patient" element={<AdminPatient />} />
        <Route path="/admin-doctor" element={<AdminDoctor />} />
        <Route path="/patients-stats" element={<PatientStats />} />
        <Route path="/doctors-stats" element={<DoctorStats />} />
        <Route path="/web-stats" element={<WebStats />} />
        <Route path="/admin-appointments" element={<AdminAppoint />} />
      </Routes>
    </Router>
  );
}

export default App;
