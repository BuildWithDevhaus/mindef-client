import React from 'react';

const StatusTag: React.FC<StatusTagProps> = ({ content, variant = 'success', className = '' }) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold';
  
  const variantStyles: Record<typeof variant, string> = {
    success: 'bg-[#D6F7F4] text-[#145650]',
    warning: 'bg-[#FDC37A] text-[#1C1C1C]',
    danger: 'bg-[#FEE4E2] text-[#D92D20]',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {content}
    </span>
  );
};

export default StatusTag;
