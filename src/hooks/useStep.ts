import { atom, useAtom } from "jotai";

const stepAtom = atom("scan-nric");

const stepHistoryAtom = atom<string[]>([]);

export const useStep = () => {
  const [step, setStep] = useAtom(stepAtom);
  const [history, setHistory] = useAtom(stepHistoryAtom);

  const nextStep = (nextStep: string) => {
    setHistory((prevHistory) => [...prevHistory, step]);
    setStep(nextStep);
  };

  const backStep = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) {
        console.warn("No previous step available to go back to.");
        return prevHistory;
      }

      const newHistory = [...prevHistory];
      const previousStep = newHistory.pop()!;

      setStep(previousStep);

      return newHistory;
    });
  };

  const resetStep = () => {
    setHistory([]);
    setStep("scan-nric");
  };

  const backToMain = () => {
    resetStep();
    if (history.some((step) => step.includes("user-registration"))) {
      setStep("user-registration-select-activity");
    } else {
      setStep("existing-user-confirmation");
    }
  }

  return {
    step,
    nextStep,
    backStep,
    resetStep,
    history,
    backToMain,
  };
};
