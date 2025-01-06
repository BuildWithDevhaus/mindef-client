import React from 'react'
import ContainerLayout from '../../components/templates/ContainerLayout'
import ButtonPrimary from '../../components/atoms/ButtonPrimary'
import shirtMaleNo1 from '../../assets/images/Shirt (Male - No. 1).png'
import pantsMaleNo1 from '../../assets/images/Pants (Male - No. 1).png'
import ButtonSecondary from '../../components/atoms/ButtonSecondary'
import { useNavigate } from 'react-router-dom'
import { useStep } from '../../hooks/useStep'
import { AdminScanRfidData } from '../../types/adminScanRfid'
import { capitalizeFirstLetter } from '../../helpers/wordStructure'

const AdminUniformResult: React.FC<AdminScanRfidData> = ({ shirtData, pantsData, onResetForm }) => {
  const { nextStep, resetStep } = useStep();
  
  const navigate = useNavigate();

  const handleConfirm = () => {
    onResetForm();
    resetStep();
    nextStep("admin-register-new-uniform-scan-rfid");
  }

  const handleBackToMain = () => {
    onResetForm();
    navigate("/admin/register-inventory");
  }
  
  return (
    <div className="flex justify-center items-center">
      <div className="w-[800px]">
        <ContainerLayout>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">
                {shirtData?.collarLen
                  ? `Shirt ID: ${shirtData.rfidNo}`
                  : `Pants ID: ${pantsData?.rfidNo}`}
              </h1>
              <p className="text-xl">
                {shirtData?.collarLen
                  ? `Description: ${shirtData?.uniformType}, ${capitalizeFirstLetter(shirtData?.gender)} Shirt, ${shirtData?.belongsTo}`
                  : `Description: ${pantsData?.uniformType}, ${capitalizeFirstLetter(pantsData ? pantsData.gender : "")} Pants, ${pantsData?.belongsTo}`}
              </p>
            </div>
            <div>
              <img
                className="h-[100px] w-[100px] object-contain"
                src={shirtData?.collarLen ? shirtMaleNo1 : pantsMaleNo1}
                alt="Uniform Image"
              />
            </div>
          </div>
          <div className="border-b-2 border-[#D7D7D7]"></div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl">
              {shirtData?.collarLen ? "Shirt Location" : "Pants Location"}
            </h3>
            <div>
              <p className="text-2xl">
                Row :
                {shirtData?.collarLen
                  ? ` ${shirtData?.row}`
                  : ` ${pantsData?.row}`}
              </p>
              <p className="text-2xl">
                Rack :
                {shirtData?.collarLen
                  ? ` ${shirtData?.rack}`
                  : ` ${pantsData?.rack}`}
              </p>
            </div>
          </div>
          <div className="w-full flex gap-9">
            <ButtonPrimary
              className="w-full text-xl font-medium"
              onClick={handleConfirm}
            >
              Add New Item
            </ButtonPrimary>
            <ButtonSecondary
              className="w-full text-xl font-medium"
              onClick={handleBackToMain}
            >
              Back to Main
            </ButtonSecondary>
          </div>
        </ContainerLayout>
      </div>
    </div>
  );
}

export default AdminUniformResult