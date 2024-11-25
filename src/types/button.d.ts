interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string
}

interface ButtonIconProps {
  icon: 'close' | 'pencil';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}