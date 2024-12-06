interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string
  variant?: 'default' | 'large';
}

interface ButtonIconProps {
  icon: 'close' | 'pencil' | 'trash';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

interface BackButtonProps {
  className?: string;
}

interface LogoutButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}