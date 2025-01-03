import React, { useEffect, useState } from 'react'
import ContainerLayout from '../../components/templates/ContainerLayout'
import ButtonPrimary from '../../components/atoms/ButtonPrimary'
import shirtMaleNo1 from '../../assets/images/Shirt (Male - No. 1).png'
import pantsMaleNo1 from '../../assets/images/Pants (Male - No. 1).png'
import ButtonSecondary from '../../components/atoms/ButtonSecondary'
import { useNavigate } from 'react-router-dom'
import { useStep } from '../../hooks/useStep'
import { useUniform } from '../../hooks/useUniform'
import { ShirtSchema } from '../../zod/shirt'
import { PantsSchema } from '../../zod/pants'
import { capitalizeFirstLetter } from '../../helpers/wordStructure'

const AdminReturnUniformConfirmed: React.FC = () => {
  const [selectedShirt, setSelectedShirt] = useState<ShirtSchema>({
    id: 0,
    rfidNo: "",
    belongsTo: "",
    gender: "",
    uniformType: "",
    collarLen: "",
    sleeve: "",
    shoulderLen: "",
    row: "",
    rack: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    drawUniform: []
  });
  const [selectedPants, setSelectedPants] = useState<PantsSchema>({
    id: 0,
    rfidNo: "",
    belongsTo: "",
    gender: "",
    uniformType: "",
    waist: "",
    length: "",
    row: "",
    rack: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    drawUniform: []
  });
  const { uniform } = useUniform();
  const { nextStep, resetStep } = useStep();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!uniform) return;

    if (uniform.type === 'shirt') setSelectedShirt(uniform.data);
    if (uniform.type === 'pants') setSelectedPants(uniform.data);
  }, [uniform]);

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
                {selectedShirt.rfidNo
                  ? `Shirt ID: ${selectedShirt.rfidNo}`
                  : `Pants ID: ${selectedPants?.rfidNo}`}
              </h1>
              <p className="text-xl">
                {selectedShirt.rfidNo
                  ? `Description: ${selectedShirt?.uniformType}, ${capitalizeFirstLetter(selectedShirt?.gender)} Shirt, ${selectedShirt?.belongsTo}`
                  : `Description: ${selectedPants?.uniformType}, ${capitalizeFirstLetter(selectedPants?.gender)} Pants, ${selectedPants?.belongsTo}`}
              </p>
            </div>
            <div>
              <img
                className="h-[100px] w-[100px] object-contain"
                src={selectedShirt.rfidNo ? shirtMaleNo1 : pantsMaleNo1}
                alt="Uniform Image"
              />
            </div>
          </div>
          <div className="border-b-2 border-[#D7D7D7]"></div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl">
              {selectedShirt.rfidNo ? "Shirt Location" : "Pants Location"}
            </h3>
            <div>
              <p className="text-2xl">
                Row :
                {selectedShirt.rfidNo
                  ? ` ${selectedShirt?.row}`
                  : ` ${selectedPants?.row}`}
              </p>
              <p className="text-2xl">
                Rack :
                {selectedShirt.rfidNo
                  ? ` ${selectedShirt?.rack}`
                  : ` ${selectedPants?.rack}`}
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