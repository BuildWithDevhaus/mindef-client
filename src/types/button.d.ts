interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

interface ButtonIconProps {
  icon: 'close' | 'pencil';
  onClick?: () => void;
  className?: string;
}