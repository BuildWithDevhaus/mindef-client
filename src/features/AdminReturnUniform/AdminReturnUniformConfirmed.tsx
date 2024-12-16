import React from 'react'
import ContainerLayout from '../../components/templates/ContainerLayout'
import ButtonPrimary from '../../components/atoms/ButtonPrimary'
import shirtMaleNo1 from '../../assets/images/Shirt (Male - No. 1).png'
import pantsMaleNo1 from '../../assets/images/Pants (Male - No. 1).png'
import ButtonSecondary from '../../components/atoms/ButtonSecondary'
import { useNavigate } from 'react-router-dom'
import { useStep } from '../../hooks/useStep'



const AdminReturnUniformConfirmed: React.FC<AdminScanRfidData> = ({ shirtData, pantsData }) => {
  const { nextStep, resetStep } = useStep();
  
  const navigate = useNavigate();

  const handleConfirm = () => {
    resetStep();
    nextStep("admin-return-uniform-scan-rfid");
  }
  
  return (
    <div className="flex justify-center items-center">
      <div className="w-[800px]">
        <ContainerLayout>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">
                {shirtData
                  ? `Shirt ID: ${shirtData.id}`
                  : `Pants ID: ${pantsData?.id}`}
              </h1>
              <p className="text-xl">
                {shirtData
                  ? `Description: ${shirtData?.uniformType}, ${shirtData?.gender} Shirt, ${shirtData?.belongsTo}`
                  : `Description: ${pantsData?.uniformType}, ${pantsData?.gender} Pants, ${pantsData?.belongsTo}`}
              </p>
            </div>
            <div>
              <img
                className="h-[100px] w-[100px] object-contain"
                src={shirtData ? shirtMaleNo1 : pantsMaleNo1}
                alt="Uniform Image"
              />
            </div>
          </div>
          <div className="border-b-2 border-[#D7D7D7]"></div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl">
              {shirtData ? "Shirt Location" : "Pants Location"}
            </h3>
            <div>
              <p className="text-2xl">
                Row :
                {shirtData
                  ? ` ${shirtData?.shirtLocation?.Row}`
                  : ` ${pantsData?.pantsLocation?.Row}`}
              </p>
              <p className="text-2xl">
                Rack :
                {shirtData
                  ? ` ${shirtData?.shirtLocation?.Rack}`
                  : ` ${pantsData?.pantsLocation?.Rack}`}
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
              onClick={() => navigate("/admin")}
            >
              Back to Main
            </ButtonSecondary>
          </div>
        </ContainerLayout>
      </div>
    </div>
  );
}

export default AdminReturnUniformConfirmed