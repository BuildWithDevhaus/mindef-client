import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPin: React.FC = () => {
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEditPin = () => {
    if (newPin.length !== 7 || confirmPin.length !== 7) {
      setError('PIN must be exactly 7 digits.');
      return;
    }

    if (newPin !== confirmPin) {
      setError('Pins do not match!');
      return;
    }

    // Save new PIN to localStorage
    localStorage.setItem('pin', newPin);
    alert('Pin updated successfully!');
    localStorage.removeItem('isAuthenticated');7
    setError(null); // Clear any existing error
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-5xl font-bold mb-6">Edit PIN</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* New PIN Input */}
      <div className="mb-4">
        <input
          type="password"
          placeholder="Enter new PIN (7 digits)"
          className="border rounded-lg p-2 w-80"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))} // Ensure only digits
          maxLength={7}
        />
      </div>

      {/* Confirm PIN Input */}
      <div className="mb-4">
        <input
          type="password"
          placeholder="Confirm new PIN (7 digits)"
          className="border rounded-lg p-2 w-80"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))} // Ensure only digits
          maxLength={7}
        />
      </div>

      {/* Edit Button */}
      <button
        className="bg-[#2F6D57] text-white p-3 rounded-lg w-80"
        onClick={handleEditPin}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditPin;
