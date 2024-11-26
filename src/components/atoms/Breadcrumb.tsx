import React from "react";
import clsx from "clsx";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <div
      className={clsx(
        `flex gap-2 font-semibold text-[#838D95] text-base`,
        className
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.url ? (
            <a href={item.url} className="hover:underline">
              {item.label}
            </a>
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
