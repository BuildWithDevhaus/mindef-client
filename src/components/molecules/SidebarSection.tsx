import React from "react";
import SidebarItem from "../atoms/SidebarItem";

const SidebarSection: React.FC<SidebarSectionProps> =({ title, items }) => (
  <div className="my-4">
    <h3 className="text-green-700 text-xl font-semibold pl-6">{title}</h3>
    <div className="mt-2">
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          label={item.label}
          onClick={item.onClick}
          isActive={item.isActive}
        />
      ))}
    </div>
  </div>
);

export default SidebarSection;
