import { StaffInputSchema, StaffSchema } from "../zod/staff";

interface UserRegistrationStepProps extends StepProps {
  userDetails: StaffInputSchema;
  onConfirm: (userDetails: StaffInputSchema) => void;
}

interface UserRegistrationStepNextProps extends UserRegistrationStepProps {
  nextStepDestination: string;
}

interface UserRegistrationStepSubmitProps extends UserRegistrationStepProps {
  onSubmit: () => void;
}

interface UserExistingStepProps extends StepProps {
  staff: StaffSchema;
  onConfirm: (staff: StaffSchema) => void;
}

interface UserExistingStepNextProps extends UserExistingStepProps {
  nextStepDestination: string;
}

interface UserExistingStepSubmitProps extends UserExistingStepProps {
  onSubmit: () => void;
}