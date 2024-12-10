import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";


const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        `flex gap-2 font-semibold text-[#838D95] text-base`,
        className
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:underline"
            >
              {item.label}
            </button>
          ) : item.url ? (
            <button
              onClick={() => navigate(item.url!)}
              className="hover:underline"
            >
              {item.label}
            </button>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="font-black text-center">•</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
