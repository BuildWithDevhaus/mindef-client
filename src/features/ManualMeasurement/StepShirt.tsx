import React, { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import shirtMaleNo1 from "../../assets/images/Measure Shirt (Male - No. 1).png";
import ContainerLayout from "../../components/templates/ContainerLayout";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import SelectOptionItem from "../../components/atoms/SelectOptionItem";
import InputContainerLayout from "../../components/templates/InputContainerLayout";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import ButtonBack from "../../components/atoms/ButtonBack";
import { useShirt } from "../../hooks/useShirt";
import { useStaff } from "../../hooks/useStaff";

const StepShirt: React.FC<ManualMeasurementFormStepNextProps> = ({
  manualMeasurementInput,
  onConfirm,
  nextStepDirection,
  backOption
}) => {
  const [inputValue, setInputValue] = useState(manualMeasurementInput);
  const { nextStep } = useStep();
  const { shirtDimensions, getShirtsDimensionRange } = useShirt();
  const { staff } = useStaff();

  useEffect(() => {
    getShirtsDimensionRange(inputValue.uniformType, staff?.gender);
  }, [])

  useEffect(() => {
    if (!shirtDimensions?.collarLen || !shirtDimensions?.sleeve || !shirtDimensions?.shoulderLen ) return;

    setInputValue({ ...manualMeasurementInput, ...inputValue, collarLen: String(shirtDimensions?.collarLen[0]), sleeve: String(shirtDimensions?.sleeve[0]), shoulderLen: String(shirtDimensions?.shoulderLen[0]) });
  }, [shirtDimensions]);

  const handleChange = (key: string, value: string | number) => {
    setInputValue({ ...inputValue, [key]: value });
  };

  const handleConfirm = () => {
    onConfirm({ ...manualMeasurementInput, ...inputValue });
    nextStep(nextStepDirection);
  };

  return (
    <>
      <div className="flex items-center h-full justify-between">
        {/* TODO: Change Image based on option */}
        <img src={shirtMaleNo1} alt="Shirt Image" className="w-1/2" />
        <ContainerLayout>
          <InputContainerLayout title="1. Shoulder Length" label="Width">
            <SelectOptionPrimary
              placeholder="Select your Shoulder Length"
              name="shoulderLen"
              value={inputValue.shoulderLen}
              onChange={(e) => handleChange("shoulderLen", e.target.value)}
              className="text-lg bg-white bg-[length:32px]"
            >
              {
                shirtDimensions
                  ? shirtDimensions.shoulderLen.map((item, index) => <SelectOptionItem key={index} value={item} text={item} />)
                  : <SelectOptionItem value="16" text="16" />
              }
            </SelectOptionPrimary>
          </InputContainerLayout>
          <InputContainerLayout title="2. Sleeve" label="Length">
            <SelectOptionPrimary
              placeholder="Select your Sleeve"
              name="sleeve"
              value={inputValue.sleeve}
              onChange={(e) => handleChange("sleeve", e.target.value)}
              className="text-lg bg-white bg-[length:32px]"
            >
              {
                shirtDimensions
                  ? shirtDimensions.sleeve.map((item, index) => <SelectOptionItem key={index} value={item} text={item} />)
                  : <SelectOptionItem value="16" text="16" />
              }
            </SelectOptionPrimary>
          </InputContainerLayout>
          <InputContainerLayout title="3. Collar Length" label="Width">
            <SelectOptionPrimary
              placeholder="Select your Collar Length"
              name="collarLen"
              value={inputValue.collarLen}
              onChange={(e) => handleChange("collarLen", e.target.value)}
              className="text-lg bg-white bg-[length:32px]"
            >
              {
                shirtDimensions
                  ? shirtDimensions.collarLen.map((item, index) => <SelectOptionItem key={index} value={item} text={item} />)
                  : <SelectOptionItem value="16" text="16" />
              }
            </SelectOptionPrimary>
          </InputContainerLayout>
          <ButtonPrimary variant="large" onClick={handleConfirm}>Submit</ButtonPrimary>
        </ContainerLayout>
      </div>

      {backOption && <ButtonBack />}
    </>
  );
};

export default StepShirt;
