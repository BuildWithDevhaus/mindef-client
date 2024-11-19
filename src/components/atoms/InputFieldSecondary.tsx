interface InputFieldSecondaryProps {
  placeholder: string
  className?: string
  type?: 'disabled' | 'enabled'
}

const InputFieldSecondary: React.FC<InputFieldSecondaryProps> = ({ placeholder, className, type = 'enabled' }) => {
  const isDisabled = type === 'disabled'

  return (
    <input
      type="text"
      className={`text-center text-base w-full py-[10px] px-[14px] border bg-[#FFFFFF] border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2F6D57] ${className}`}
      placeholder={placeholder}
      disabled={isDisabled} 
    />
  )
}

export default InputFieldSecondary