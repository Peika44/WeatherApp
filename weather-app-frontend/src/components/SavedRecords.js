import React, { useState } from 'react';
import axios from 'axios';

function SavedRecords({ records, refreshRecords }) {
  const [editId, setEditId] = useState(null);
  const [newLocation, setNewLocation] = useState('');

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/api/weather';

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/${id}`);
      refreshRecords();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete record.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/${id}`, { location: newLocation });
      setEditId(null);
      refreshRecords();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update record.');
    }
  };

  return (
    <div>
      <h2>Saved Weather Records</h2>
      <ul>
        {records.map(record => (
          <li key={record._id}>
            <strong>{record.location}</strong> – {record.weather.temp}°C – {record.weather.description}
            {editId === record._id ? (
              <>
                <input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="New location"
                />
                <button onClick={() => handleUpdate(record._id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => {
                  setEditId(record._id);
                  setNewLocation(record.location);
                }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(record._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedRecords;
