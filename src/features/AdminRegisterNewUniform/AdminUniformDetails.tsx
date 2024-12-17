import React, { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import { AdminNewUniformFormNextProps } from "../../types/adminScanRfid";

const AdminUniformDetails: React.FC<AdminNewUniformFormNextProps> = ({ onConfirm, nextStepDestination, shirtData, pantsData }) => {
  const { nextStep } = useStep();
  const [uniformDetails, setUniformDetails] = useState({
    topBottom: shirtData ? "shirt" : pantsData ? "pants" : "shirt",
    belongsTo: "Airforce",
    gender: "male",
    uniformType: "No. 1",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUniformDetails({ ...uniformDetails, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    onConfirm(uniformDetails);
    nextStep(nextStepDestination);
  }

  useEffect(() => {
    if (shirtData?.collarLen) {
      setUniformDetails((prevState) => ({
        ...prevState,
        topBottom: "shirt",
        gender: shirtData.gender,
        uniformType: shirtData.uniformType,
        belongsTo: shirtData.belongsTo,
      }));
    } else if (pantsData?.waist) {
      setUniformDetails((prevState) => ({
        ...prevState,
        topBottom: "pants",
        gender: pantsData.gender,
        uniformType: pantsData.uniformType,
        belongsTo: pantsData.belongsTo,
      }));
    }
  }, [shirtData, pantsData]);

  return (
    <div className="flex justify-between gap-20">
      <div className="flex flex-col gap-12 w-1/2">
        <div className="h-full flex flex-col gap-6">
        <h2 className="font-bold text-2xl">Shirt / Pants</h2>
        <SelectOptionPrimary placeholder="Select" name="topBottom" className="w-full text-lg py-[10px] px-[14px]" value={uniformDetails.topBottom} onChange={handleChange}>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
        </SelectOptionPrimary>
        <h2 className="font-bold text-2xl">This shirt belongs to:</h2>
        <SelectOptionPrimary placeholder="Select" name="belongsTo" className="w-full text-lg py-[10px] px-[14px]" value={uniformDetails.belongsTo} onChange={handleChange}>
          <option value="Airforce">Airforce</option>
          <option value="Navy">Navy</option>
          <option value="Army">Army</option>
          <option value="Marines">Marines</option>
          <option value="Infantry">Infantry</option>
        </SelectOptionPrimary>
        
        <h2 className="font-bold text-2xl">Gender:</h2>
        <SelectOptionPrimary placeholder="Select" name="gender" className="w-full text-lg py-[10px] px-[14px]" value={uniformDetails.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </SelectOptionPrimary>
        
        <h2 className="font-bold text-2xl">Uniform Type:</h2>
        <SelectOptionPrimary placeholder="Select" name="uniformType" className="w-full text-lg py-[10px] px-[14px]" value={uniformDetails.uniformType} onChange={handleChange}>
          <option value="No. 1">No. 1</option>
          <option value="Colour Party">Colour Party</option>
        </SelectOptionPrimary>
      </div>
        <ButtonPrimary onClick={() => handleConfirm()} variant="large">Confirm</ButtonPrimary>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <img
          className="max-h-[59vh]"
          src={uniformDetails.topBottom === "shirt" ? shirtMaleNo1 : pantsMaleNo1}
          alt="uniform"
        />
      </div>
    </div>
  );
};

export default AdminUniformDetails;
