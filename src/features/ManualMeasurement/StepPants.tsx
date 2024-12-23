import React, { useEffect, useState } from 'react'
import ContainerLayout from '../../components/templates/ContainerLayout'
import InputContainerLayout from '../../components/templates/InputContainerLayout'
import SelectOptionItem from '../../components/atoms/SelectOptionItem'
import SelectOptionPrimary from '../../components/molecules/SelectOptionPrimary'
import pantsMaleNo1 from '../../assets/images/Measure Pants (Male - No. 1).png'
import ButtonPrimary from '../../components/atoms/ButtonPrimary'
import ButtonBack from '../../components/atoms/ButtonBack'
import { usePants } from '../../hooks/usePants'
import { useStaff } from '../../hooks/useStaff'

const StepPants: React.FC<ManualMeasurementFormStepSubmitProps> = ({
  manualMeasurementInput,
  onConfirm,
  onSubmit,
  backOption
}) => {
  const [inputValue, setInputValue] = useState(manualMeasurementInput);
  const { pantsDimensions, getPantsDimensionRange } = usePants();
  const { staff } = useStaff();

  useEffect(() => {
    getPantsDimensionRange(inputValue.uniformType, staff?.gender);
  }, []);
  
  useEffect(() => {
    if (!pantsDimensions?.waist || !pantsDimensions?.length) return;

    setInputValue({ ...manualMeasurementInput, ...inputValue, waist: String(pantsDimensions?.waist[0]), length: String(pantsDimensions?.length[0]) });
  }, [pantsDimensions]);

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
              {
                pantsDimensions
                  ? pantsDimensions.waist.map((item, index) => <SelectOptionItem key={index} value={item} text={item} />)
                  : <SelectOptionItem value="16" text="16" />
              }
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
              {
                pantsDimensions
                  ? pantsDimensions.length.map((item, index) => <SelectOptionItem key={index} value={item} text={item} />)
                  : <SelectOptionItem value="28" text="28" />
              }
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
