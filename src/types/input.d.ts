interface InputFieldProps {
  placeholder: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

interface InputLayoutProps {
  children: ReactNode;
  title: string;
  label: string;
}