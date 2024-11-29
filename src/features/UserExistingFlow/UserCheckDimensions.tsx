import React, { useEffect, useState } from "react";
import ContainerLayout from "../../components/templates/ContainerLayout";
import InputContainerLayout from "../../components/templates/InputContainerLayout";
import InputFieldSecondary from "../../components/atoms/InputFieldSecondary";
import ButtonPrimary from "../../components/atoms/ButtonPrimary";
import ButtonBack from "../../components/atoms/ButtonBack";
import shirtMaleNo1 from "../../assets/images/Shirt (Male - No. 1).png";
import pantsMaleNo1 from "../../assets/images/Pants (Male - No. 1).png";
import { useStep } from "../../hooks/useStep";
import { useStaff } from "../../hooks/useStaff";
import ButtonSecondary from "../../components/atoms/ButtonSecondary";

const UserCheckDimensions: React.FC = () => {
  const [inputValue, setInputValue] = useState({
    shoulderLen: 16,
    sleeve: 16,
    waist: 16,
    collarLen: 16,
    length: 16,
  });
  const { nextStep, backStep } = useStep();
  const { staff } = useStaff();

  useEffect(() => {
    if (staff) {
      setInputValue({
        shoulderLen: staff.shoulderLen ?? 16,
        sleeve: staff.sleeve ?? 16,
        waist: staff.waist ?? 16,
        collarLen: staff.collarLen ?? 16,
        length: staff.length ?? 16,
      });
    }
  }, [staff]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    let resultFound = true;
    
    // TODO: Change this into real logic
    if (resultFound) {
      nextStep("existing-user-result");
    } else {
      nextStep("existing-user-notfound");
    }

    setInputValue({
      shoulderLen: 16,
      sleeve: 16,
      waist: 16,
      collarLen: 16,
      length: 16
    })
  };

  const handleBack = () => {
    backStep();
  };

  return (
    <form
      className="flex h-full justify-center items-center"
      name="check-existing-dimension-form"
      id="check-existing-dimension-form"
      onSubmit={handleSubmit}
    >
      <ContainerLayout>
        <div className="flex flex-col gap-9">
          <h1 className="font-bold text-[32px] underline text-center">Confirm your Uniform Dimensions</h1>
          <div className="flex gap-24">
            <div className="flex flex-col gap-7">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[32px]">Shirt</label>
                <img
                  src={shirtMaleNo1}
                  alt="Shirt"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="border border-black" />
              <InputContainerLayout title="Shoulder Length" label="Width">
                <InputFieldSecondary
                  placeholder="16cm"
                  type="disabled"
                  value={inputValue.shoulderLen}
                />
              </InputContainerLayout>
              <InputContainerLayout title="Sleeve" label="Length">
                <InputFieldSecondary
                  placeholder="16cm"
                  type="disabled"
                  value={inputValue.sleeve}
                />
              </InputContainerLayout>
              <InputContainerLayout title="Collar Length" label="Width">
                <InputFieldSecondary
                  placeholder="16cm"
                  type="disabled"
                  value={inputValue.collarLen}
                />
              </InputContainerLayout>
            </div>
            <div className="flex flex-col gap-7">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[32px]">Pants</label>
                <img
                  src={pantsMaleNo1}
                  alt="Pants"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="border border-black" />
              <InputContainerLayout title="Waist" label="Width">
                <InputFieldSecondary
                  placeholder="16cm"
                  type="disabled"
                  value={inputValue.waist}
                />
              </InputContainerLayout>
              <InputContainerLayout title="Pants Length" label="Length">
                <InputFieldSecondary
                  placeholder="16cm"
                  type="disabled"
                  value={inputValue.length}
                />
              </InputContainerLayout>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <ButtonPrimary variant="large" onClick={() => handleSubmit}>
              Confirm
            </ButtonPrimary>
            <ButtonSecondary variant="large" onClick={() => nextStep("existing-user-reselect")}>
              Reselect
            </ButtonSecondary>
          </div>
        </div>
      </ContainerLayout>
      <ButtonBack onClick={handleBack} />
    </form>
  );
};

export default UserCheckDimensions;
