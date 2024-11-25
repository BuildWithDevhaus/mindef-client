interface SelectOptionProps {
  placeholder: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  children?: ReactNode;
}

interface SelectOptionItemProps {
  value: string;
  text: string;
}
