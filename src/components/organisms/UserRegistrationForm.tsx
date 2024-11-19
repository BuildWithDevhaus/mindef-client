import React, { useState } from "react";
import { useStep } from "../../hooks/useStep";

const UserRegistrationForm: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    division: "",
    gender: "",
  });

  const { step, setStep } = useStep();

  return (
    <>
      {step === "user-registration" && (
        <div className="transition-opacity duration-500 ease-in-out opacity-100 text-center">
          <h2 className="text-2xl font-bold mb-4">User Registration</h2>
          <p className="text-lg">Enter your name, division, and gender</p>
        </div>
      )}
    </>
  );
};

export default UserRegistrationForm;
