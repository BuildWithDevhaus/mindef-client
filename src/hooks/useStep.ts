import { atom, useAtom } from "jotai";

const stepAtom = atom("scan-nric");
const prevStepAtom = atom("");

export const useStep = () => {
  const [step, setStep] = useAtom(stepAtom);
  const [prevStep, setPrevStep] = useAtom(prevStepAtom);

  const backStep = () => {
    if (prevStep) {
      console.log(prevStep);
      setStep(prevStep);
    } else {
      console.warn("No previous step available to go back to.");
    }
  };

  const nextStep = (nextStep: string) => {
    setPrevStep(step);
    console.log(nextStep);
    setStep(nextStep);
  };

  const resetStep = () => {
    setStep("scan-nric");
    setPrevStep("");
  };

  return {
    step,
    backStep,
    nextStep,
    resetStep,
  };
};
