import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/ViewAppointment.css";

const API_BASE_URL = "http://localhost:8080/api/patient";

function ViewAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/appointments`);
        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="page-container">
      <h2>Your Appointments</h2>
      {error && <p className="error-message">{error}</p>}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="doctors-list">
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                <strong>Date:</strong> {appointment.date} <br />
                <strong>Doctor:</strong> {appointment.doctorId} <br />
                <strong>Details:</strong> {appointment.details || "N/A"} <br />
                <strong>Status:</strong> {appointment.status || "Pending"}{" "}
                <br />
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewAppointment;
