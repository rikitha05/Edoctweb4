import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"; // Assuming this is where your axios instance is stored
import "../CSS/AdminPatient.css";

function AdminPatient() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editPatient, setEditPatient] = useState(null);

  useEffect(() => {
    api
      .get(`${localStorage.getItem("username")}/admin/patients`)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleEdit = (patient) => {
    setEditPatient(patient);
  };

  const handleDelete = (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      api
        .delete(
          `${localStorage.getItem("username")}/admin/patientDelete/${patientId}`
        )
        .then(() => {
          setPatients((prevPatients) =>
            prevPatients.filter((patient) => patient.patientId !== patientId)
          );
          alert("Patient deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting patient:", error);
        });
    }
  };

  const handleSave = () => {
    if (editPatient) {
      api
        .put(
          `${localStorage.getItem("username")}/admin/patientUpdate/${
            editPatient.patientId
          }`,
          editPatient
        )
        .then((response) => {
          setPatients((prevPatients) =>
            prevPatients.map((patient) =>
              patient.patientId === response.data.patientId
                ? response.data
                : patient
            )
          );
          setEditPatient(null);
          alert("Patient updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating patient:", error);
        });
    }
  };

  return (
    <div className="patient-page">
      <header className="patient-page-header">
        <h1>Patient Management</h1>
        <Link to="/admin-dashboard">Back to Dashboard</Link>
      </header>

      {isLoading ? (
        <p>Loading patients...</p>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId}>
                <td>{patient.patientId}</td>
                <td>
                  {editPatient &&
                  editPatient.patientId === patient.patientId ? (
                    <input
                      type="text"
                      value={editPatient.name}
                      onChange={(e) =>
                        setEditPatient({ ...editPatient, name: e.target.value })
                      }
                    />
                  ) : (
                    patient.name
                  )}
                </td>
                <td>
                  {editPatient &&
                  editPatient.patientId === patient.patientId ? (
                    <input
                      type="email"
                      value={editPatient.email}
                      onChange={(e) =>
                        setEditPatient({
                          ...editPatient,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    patient.email
                  )}
                </td>
                <td>
                  {editPatient &&
                  editPatient.patientId === patient.patientId ? (
                    <input
                      type="text"
                      value={editPatient.mobileNo}
                      onChange={(e) =>
                        setEditPatient({
                          ...editPatient,
                          mobileNo: e.target.value,
                        })
                      }
                    />
                  ) : (
                    patient.mobileNo
                  )}
                </td>
                <td>{patient.gender}</td>
                <td>{patient.bloodGroup}</td>
                <td>{patient.age}</td>
                <td>
                  {editPatient &&
                  editPatient.patientId === patient.patientId ? (
                    <button onClick={handleSave}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(patient)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(patient.patientId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPatient;
