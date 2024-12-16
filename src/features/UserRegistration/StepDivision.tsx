import React, { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import SelectOptionPrimary from "../../components/molecules/SelectOptionPrimary";
import SelectOptionItem from "../../components/atoms/SelectOptionItem";
import ButtonBack from "../../components/atoms/ButtonBack";
import { UserRegistrationStepNextProps } from "../../types/staffSteps";
import { DivisionSchema } from "../../zod/division";
import { api } from "../../helpers/api";

const StepDivision: React.FC<UserRegistrationStepNextProps> = ({
  userDetails,
  onConfirm,
  nextStepDestination,
  backOption
}) => {
  const [divisions, setDivisions] = useState<DivisionSchema[]>([]);
  const [inputValue, setInputValue] = useState(userDetails);
  const { nextStep } = useStep();

  useEffect(() => {
    (async () => {
      const { data: divisionsData }: { data: DivisionSchema[] } = await api.get('/divisions');
      setDivisions(divisionsData);
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue({ ...inputValue, divisionId: Number(e.target.value) });
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
    nextStep(nextStepDestination);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between h-full">
        <label className="text-6xl font-bold">Select your Unit/Wing</label>
        <SelectOptionPrimary placeholder="Select your Unit/Wing" value={inputValue.divisionId} onChange={handleChange} className="w-full">
          {divisions.map((division) => (
            <SelectOptionItem key={division.id} value={String(division.id)} text={division.name} />
          ))}
        </SelectOptionPrimary>
        <ButtonPrimary onClick={() => handleConfirm()} variant="large">Confirm</ButtonPrimary>
      </div>

      {backOption && <ButtonBack />}
    </>
  );
};

export default StepDivision;
