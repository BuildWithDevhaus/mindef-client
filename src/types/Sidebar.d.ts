interface SidebarItemProps {
      label: string; // The label for the sidebar item
      onClick?: () => void; // Optional click handler for the item
      isActive?: boolean; // Determines if the item is active
    }

interface SidebarSectionProps {
      title: string; 
      items: SidebarItemProps[];
    }