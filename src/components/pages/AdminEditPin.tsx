import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../atoms/ButtonPrimary";
import ContainerLayout from "../templates/ContainerLayout";
import { ToastContainer } from "react-toastify";
import { toastAlert } from "../../helpers/toastAlert";

const EditPin: React.FC = () => {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEditPin = () => {
    if (newPin.length !== 7 || confirmPin.length !== 7) {
      toastAlert("error", "PIN must be exactly 7 digits.");
      return;
    }

    if (newPin !== confirmPin) {
      toastAlert("error", "Pins do not match!");
      return;
    }
    localStorage.setItem("pin", newPin);
    localStorage.removeItem("isAuthenticated");
    7;
    setError(null);
    navigate("/admin/login", {
      state: {
        toastMessage: "PIN updated successfully! You need to login again.",
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <ContainerLayout>
        <div className="p-3 gap-3 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-6">Edit PIN</h1>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter new PIN (7 digits)"
                className="border rounded-lg p-2 w-80"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))} // Ensure only digits
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
                onChange={(e) =>
                  setConfirmPin(e.target.value.replace(/\D/g, ""))
                } // Ensure only digits
                maxLength={7}
              />
            </div>
          </div>
          {/* New PIN Input */}
          {/* Edit Button */}
          <ButtonPrimary className="w-80" onClick={handleEditPin}>
            Save Changes
          </ButtonPrimary>
        </div>
      </ContainerLayout>
      <ToastContainer />
    </div>
  );
};

export default EditPin;
