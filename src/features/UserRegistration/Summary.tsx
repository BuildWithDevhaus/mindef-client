import React from "react";

const Summary: React.FC<{ userDetails: UserDetails }> = ({ userDetails }) => {
  return (
    <div className="transition-opacity duration-500 ease-in-out opacity-100 text-center">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <p className="text-lg">Name: {userDetails.name}</p>
      <p className="text-lg">Division: {userDetails.division}</p>
      <p className="text-lg">Gender: {userDetails.gender}</p>
    </div>
  );
};

export default Summary;
