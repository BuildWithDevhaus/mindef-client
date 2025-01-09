interface InputFieldProps {
  placeholder: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

interface InputLayoutProps {
  children: React.ReactNode;
  label: string;
  title: string;
  variant?: "default" | "small";
}