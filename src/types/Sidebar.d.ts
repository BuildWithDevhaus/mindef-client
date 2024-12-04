interface SidebarItemProps {
      label: string; 
      onClick?: () => void; 
      isActive?: boolean;
    }

interface SidebarSectionProps {
      title: string; 
      items: SidebarItemProps[];
    }