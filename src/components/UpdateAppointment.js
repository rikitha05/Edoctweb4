import React, { useState } from "react";
import axios from "axios";
import "../CSS/UpdateAppointment.css";

const API_BASE_URL = "http://localhost:8080/api/patient";

function UpdateAppointment() {
  const [appointmentId, setAppointmentId] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState({});

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateAppointment/${appointmentId}`,
        updatedDetails
      );
      alert("Appointment updated successfully!");
    } catch (error) {
      console.error("Error updating appointment", error);
    }
  };

  return (
    <div className="update-container">
      <h2>Update Appointment</h2>
      <input
        className="update-input"
        type="text"
        placeholder="Appointment ID"
        value={appointmentId}
        onChange={(e) => setAppointmentId(e.target.value)}
      />
      <input
        className="update-input"
        type="text"
        placeholder="New Date"
        onChange={(e) =>
          setUpdatedDetails({ ...updatedDetails, date: e.target.value })
        }
      />
      <input
        className="update-input"
        type="text"
        placeholder="New Details"
        onChange={(e) =>
          setUpdatedDetails({ ...updatedDetails, details: e.target.value })
        }
      />
      <button className="update-button" onClick={handleUpdate}>
        Update Appointment
      </button>
    </div>
  );
}

export default UpdateAppointment;
