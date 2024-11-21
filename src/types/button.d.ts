interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface ButtonIconProps {
  icon: 'close' | 'pencil';
  onClick?: () => void;
  className?: string;
}