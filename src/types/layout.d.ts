interface BreadcrumbItem {
    label: string;
    url?: string;
  }
  
  interface AdminTemplateProps {
    children: React.ReactNode;
    headingText: string;
    subText?: string;
    breadcrumbItems: BreadcrumbItem[];
  }
