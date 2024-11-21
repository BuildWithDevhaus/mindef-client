interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

interface ButtonIconProps extends ButtonProps {
  icon: 'close' | 'pencil';
}