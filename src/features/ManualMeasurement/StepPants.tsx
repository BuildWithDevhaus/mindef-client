import React, { useState } from 'react'
import ContainerLayout from '../../components/templates/ContainerLayout'
import InputContainerLayout from '../../components/templates/InputContainerLayout'
import SelectOptionItem from '../../components/atoms/SelectOptionItem'
import SelectOptionPrimary from '../../components/molecules/SelectOptionPrimary'
import pantsMaleNo1 from '../../assets/images/Measure Pants (Male - No. 1).png'
import ButtonPrimary from '../../components/atoms/ButtonPrimary'
import ButtonBack from '../../components/atoms/ButtonBack'

const StepPants: React.FC<ManualMeasurementFormStepSubmitProps> = ({
  manualMeasurementInput,
  onConfirm,
  onSubmit,
  backOption
}) => {
  const [inputValue, setInputValue] = useState(manualMeasurementInput);

  const handleChange = (key: string, value: string | number) => {
    setInputValue({ ...inputValue, [key]: value });
  };

  const handleConfirm = () => {
    onConfirm({ ...manualMeasurementInput, ...inputValue });
    onSubmit();
  };

  return (
    <>
      <div className="flex items-center h-full justify-between">
        {/* TODO: Change Image based on option */}
        <img src={pantsMaleNo1} alt="Shirt Image" className="w-1/2" />
        <ContainerLayout>
          <InputContainerLayout title="1. Waist" label="Width">
            <SelectOptionPrimary
              placeholder="Select your Waist"
              name="waist"
              value={inputValue.waist}
              onChange={(e) => handleChange("waist", e.target.value)}
              className="text-lg bg-white bg-[length:32px]"
            >
              <SelectOptionItem value="16" text="16" />
              <SelectOptionItem value="17" text="17" />
              <SelectOptionItem value="18" text="18" />
              <SelectOptionItem value="19" text="19" />
              <SelectOptionItem value="20" text="20" />
            </SelectOptionPrimary>
          </InputContainerLayout>
          <InputContainerLayout title="2. Pants Length" label="Length">
            <SelectOptionPrimary
              placeholder="Select your Pants Length"
              name="length"
              value={inputValue.length}
              onChange={(e) => handleChange("length", e.target.value)}
              className="text-lg bg-white bg-[length:32px]"
            >
              <SelectOptionItem value="16" text="16" />
              <SelectOptionItem value="17" text="17" />
              <SelectOptionItem value="18" text="18" />
              <SelectOptionItem value="19" text="19" />
              <SelectOptionItem value="20" text="20" />
            </SelectOptionPrimary>
          </InputContainerLayout>
          <ButtonPrimary variant="large" onClick={handleConfirm}>Submit</ButtonPrimary>
        </ContainerLayout>
      </div>

      {backOption && <ButtonBack />}
    </>
  )
}

export default StepPants
