interface UserDetails {
  name: string;
  division: string;
  gender: string;
}

interface UserRegistrationStepProps {
  userDetails: UserDetails;
  onConfirm: (userDetails: UserDetails) => void;
}