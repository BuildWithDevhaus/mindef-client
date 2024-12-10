import React, { useState, useEffect } from "react";
import { useStep } from "../../hooks/useStep";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";

const AdminUniformDetails: React.FC<AdminScanRfidData> = ({ shirtData, pantsData }) => {
  const { nextStep } = useStep();


  const [selectedOption, setSelectedOption] = useState(shirtData ? 'shirt' : pantsData ? 'pants' : '');
  
  const [belongsTo, setBelongsTo] = useState(shirtData?.belongsTo || pantsData?.belongsTo || '');
  const [gender, setGender] = useState(shirtData?.gender || pantsData?.gender || '');
  const [uniformType, setUniformType] = useState(shirtData?.uniformType || pantsData?.uniformType || '');

  useEffect(() => {
    if (shirtData) {
      setSelectedOption('shirt');
      setBelongsTo(shirtData.belongsTo || '');
      setGender(shirtData.gender || '');
      setUniformType(shirtData.uniformType || '');
    } else if (pantsData) {
      setSelectedOption('pants');
      setBelongsTo(pantsData.belongsTo || '');
      setGender(pantsData.gender || '');
      setUniformType(pantsData.uniformType || '');
    }
  }, [shirtData, pantsData]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<any>>) => {
    const value = event.target.value;
    setter(value);  
  };

  const handleConfirm = () => {
    nextStep("admin-register-new-uniform-form-uniform-dimension");
  }

  return (
    <div className="flex justify-between gap-20">
      <div className="flex flex-col gap-12 w-1/2">
        <div className="h-full flex flex-col gap-6">
        <h2 className="font-bold text-2xl">Shirt / Pants</h2>
        <SelectOptionPrimary placeholder="Select" className="w-full text-lg py-[10px] px-[14px]" value={selectedOption} onChange={(e) => handleSelectChange(e, setSelectedOption)}>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
        </SelectOptionPrimary>
        <h2 className="font-bold text-2xl">This shirt belongs to:</h2>
        <SelectOptionPrimary placeholder="Select" className="w-full text-lg py-[10px] px-[14px]" value={belongsTo} onChange={(e) => handleSelectChange(e, setBelongsTo)}>
          <option value="Airforce">Airforce</option>
          <option value="Navy">Navy</option>
          <option value="Army">Army</option>
          <option value="Marines">Marines</option>
          <option value="Infantry">Infantry</option>
        </SelectOptionPrimary>
        
        <h2 className="font-bold text-2xl">Gender:</h2>
        <SelectOptionPrimary placeholder="Select" className="w-full text-lg py-[10px] px-[14px]" value={gender} onChange={(e) => handleSelectChange(e, setGender)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </SelectOptionPrimary>
        
        <h2 className="font-bold text-2xl">Uniform Type:</h2>
        <SelectOptionPrimary placeholder="Select" className="w-full text-lg py-[10px] px-[14px]" value={uniformType} onChange={(e) => handleSelectChange(e, setUniformType)}>
          <option value="No. 1">No. 1</option>
          <option value="No. 2">No. 2</option>
          <option value="Colour Party">Colour Party</option>
        </SelectOptionPrimary>
      </div>
        <ButtonPrimary onClick={() => handleConfirm()} variant="large">Confirm</ButtonPrimary>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <img
          className="max-h-[59vh]"
          src={selectedOption === "shirt" ? shirtMaleNo1 : pantsMaleNo1}
          alt="uniform"
        />
      </div>
    </div>
  );
};

export default AdminUniformDetails;