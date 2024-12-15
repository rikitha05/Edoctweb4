import React, { useState } from "react";
import axios from "axios";
import "../CSS/CancelAppointment.css"; // Import CSS

const API_BASE_URL = "http://localhost:8080/api/patient";

function CancelAppointment() {
  const [appointmentId, setAppointmentId] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleCancel = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/cancelAppointment/${appointmentId}`,
        reason,
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
      alert("Appointment canceled successfully!");
    } catch (err) {
      setError("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>Cancel Appointment</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Appointment ID"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
        />
        <textarea
          placeholder="Reason for cancellation"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button onClick={handleCancel}>Cancel Appointment</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default CancelAppointment;
