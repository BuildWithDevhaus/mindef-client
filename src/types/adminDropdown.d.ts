interface AdminDropdownMenuProps {
    userName: string;
  }

  interface DropdownItemProps {
    icon?: React.ReactNode; 
    label: string; 
    onClick: () => void; 
    className?: string; 
    role?: string; 
    tabIndex?: number; 
    onFocus?: () => void; 
  }