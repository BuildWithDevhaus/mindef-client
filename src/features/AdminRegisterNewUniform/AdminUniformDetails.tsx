import React, { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import { AdminNewUniformFormNextProps } from "../../types/adminScanRfid";

const AdminUniformDetails: React.FC<AdminNewUniformFormNextProps> = ({ shirtData, pantsData, setShirtData, setPantsData, nextStepDestination }) => {
  const { nextStep } = useStep();
  const [topBottom, setTopBottom] = useState("shirt");
  const [uniformDetails, setUniformDetails] = useState({ belongsTo: "", gender: "", uniformType: "" });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (topBottom === "shirt") setShirtData({ ...shirtData, [e.target.name]: e.target.value });
    else if (topBottom === "pants") setPantsData({ ...pantsData, [e.target.name]: e.target.value });
  }

  const handleTopBottom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "shirt") {
      setTopBottom("shirt");
      if (pantsData.belongsTo || pantsData.gender || pantsData.uniformType) {
        setShirtData({ ...shirtData, belongsTo: pantsData.belongsTo, gender: pantsData.gender, uniformType: pantsData.uniformType });
        setPantsData({ rfidNo: "", belongsTo: "", uniformType: "", gender: "", waist: "", length: "", row: "", rack: "" });
      }
    }
    else if (e.target.value === "pants") {
      setTopBottom("pants");
      if (shirtData.belongsTo || shirtData.gender || shirtData.uniformType) {
        setPantsData({ ...pantsData, belongsTo: shirtData.belongsTo, gender: shirtData.gender, uniformType: shirtData.uniformType });
        setShirtData({ rfidNo: "", belongsTo: "", uniformType: "", gender: "", shoulderLen: "", sleeve: "", collarLen: "", row: "", rack: "" });
      }
    }
  }

  const handleConfirm = () => {
    nextStep(nextStepDestination);
  }

  useEffect(() => {
    if (shirtData.belongsTo || shirtData.gender || shirtData.uniformType) {
      setUniformDetails({ ...uniformDetails, belongsTo: shirtData.belongsTo, gender: shirtData.gender, uniformType: shirtData.uniformType });
      setTopBottom("shirt");
    } else if (pantsData.belongsTo || pantsData.gender || pantsData.uniformType) {
      setUniformDetails({ ...uniformDetails, belongsTo: pantsData.belongsTo, gender: pantsData.gender, uniformType: pantsData.uniformType });
      setTopBottom("pants");
    }
  }, [shirtData, pantsData]);

  return (
    <div className="flex justify-between gap-20">
      <div className="flex flex-col gap-12 w-1/2">
        <div className="h-full flex flex-col gap-6">
        <h2 className="font-bold text-2xl">Shirt / Pants</h2>
        <SelectOptionPrimary placeholder="Select" name="topBottom" className="w-full text-lg py-[10px] px-[14px]" value={topBottom} onChange={handleTopBottom}>
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
          src={topBottom === "shirt" ? shirtMaleNo1 : pantsMaleNo1}
          alt="uniform"
        />
      </div>
    </div>
  );
};

export default AdminUniformDetails;
