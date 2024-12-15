import React, { useState } from "react";
import axios from "axios";
import "../CSS/FindDoctors.css"; // Import CSS

const API_BASE_URL = "http://localhost:8080/api/patient";

function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [error, setError] = useState("");

  const fetchDoctors = async () => {
    try {
      setError("");
      const params = {};
      if (specialization) params.specialization = specialization;
      if (availabilityDate) params.date = availabilityDate;

      const response = await axios.get(`${API_BASE_URL}/findDoctors`, {
        params,
      });
      setDoctors(response.data);
    } catch (err) {
      setError("Failed to fetch doctors. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>Find Doctors</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <input
          type="date"
          value={availabilityDate}
          onChange={(e) => setAvailabilityDate(e.target.value)}
        />
        <button onClick={fetchDoctors}>Search</button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="doctors-list">
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id}>
              <strong>Name:</strong> {doctor.name} <br />
              <strong>Specialization:</strong> {doctor.specialization} <br />
              <strong>Availability:</strong> {doctor.availability || "N/A"}{" "}
              <br />
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FindDoctors;
