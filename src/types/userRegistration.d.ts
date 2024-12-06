import { StaffSchema } from "../zod/staff";

interface UserRegistrationStepProps extends StepProps {
  userDetails: StaffSchema;
  onConfirm: (userDetails: StaffSchema) => void;
}

interface UserRegistrationStepNextProps extends UserRegistrationStepProps {
  nextStepDestination: string;
}

interface UserRegistrationStepSubmitProps extends UserRegistrationStepProps {
  onSubmit: () => void;
}