interface SelectOptionProps {
  placeholder: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

interface SelectOptionItemProps {
  value: string;
  text: string;
}
