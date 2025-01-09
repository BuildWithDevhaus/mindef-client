import React, { useEffect, useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import InputFieldSecondary from "../../components/atoms/InputFieldSecondary";
import InputContainerLayout from "../../components/templates/InputContainerLayout";
import ButtonBack from "../../components/atoms/ButtonBack";
import { useUniform } from "../../hooks/useUniform";
import { toastAlert } from "../../helpers/toastAlert";

const AutoMeasurementForm: React.FC<ManualMeasurementFormStepSubmitProps> = ({
  manualMeasurementInput,
  onConfirm,
  onSubmit,
  backOption,
}) => {
  const [inputValue, setInputValue] = useState(manualMeasurementInput);
  const { getLatestAutoMeasurementDetails } = useUniform();

  useEffect(() => {
    (async () => {
      try {
        const autoMeasurementData = await getLatestAutoMeasurementDetails();

        // TODO: Change the mapping keys
        const data = {
          collarLen: autoMeasurementData.CL,
          sleeve: autoMeasurementData.S,
          shoulderLen: autoMeasurementData.SL,
          waist: autoMeasurementData.W,
          length: autoMeasurementData.PL,
        };

        setInputValue({ ...manualMeasurementInput, ...data });
      } catch (error) {
        toastAlert("error", "Failed to get auto measurement details");
      }
    })();
  }, []);

  const handleConfirm = () => {
    onConfirm({ ...manualMeasurementInput, ...inputValue });
    onSubmit();
  };

  return (
    <>
      <div className="flex h-full justify-center items-center">
        <ContainerLayout>
          <div className="flex flex-col gap-8">
            <div className="flex gap-24">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-xl">Shirt</label>
                  <img
                    src={shirtMaleNo1}
                    alt="Shirt"
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <div className="border border-black" />
                <InputContainerLayout
                  variant="small"
                  title="Shoulder Length"
                  label="Width"
                >
                  <InputFieldSecondary
                    className="text-sm"
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.shoulderLen}
                  />
                </InputContainerLayout>
                <InputContainerLayout variant="small" title="Sleeve" label="Length">
                  <InputFieldSecondary
                    className="text-sm"
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.sleeve}
                  />
                </InputContainerLayout>
                <InputContainerLayout
                  variant="small"
                  title="Collar Length"
                  label="Width"
                >
                  <InputFieldSecondary
                    className="text-sm"
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.collarLen}
                  />
                </InputContainerLayout>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-xl">Pants</label>
                  <img
                    src={pantsMaleNo1}
                    alt="Pants"
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <div className="border border-black" />
                <InputContainerLayout variant="small" title="Waist" label="Width">
                  <InputFieldSecondary
                    className="text-sm"
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.waist}
                  />
                </InputContainerLayout>
                <InputContainerLayout
                  variant="small"
                  title="Pants Length"
                  label="Length"
                >
                  <InputFieldSecondary
                    className="text-sm"
                    placeholder="16cm"
                    type="disabled"
                    value={inputValue.length}
                  />
                </InputContainerLayout>
              </div>
            </div>
            <ButtonPrimary variant="default" onClick={handleConfirm}>
              Confirm
            </ButtonPrimary>
          </div>
        </ContainerLayout>
      </div>

      {backOption && <ButtonBack />}
    </>
  );
};

export default AutoMeasurementForm;
