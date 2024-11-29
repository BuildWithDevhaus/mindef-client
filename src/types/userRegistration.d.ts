interface UserRegistrationStepProps {
  userDetails: UserDetails;
  onConfirm: (userDetails: UserDetails) => void;
  nextStepDestination: string;
}

interface UserRegistrationFormProps {
  userDetails: UserDetails;
  onConfirm: (userDetails: UserDetails) => void;
  onSubmit: () => void;
}