import {
  LucideEdit3,
  LucideLayers,
  LucideLayoutDashboard,
  LucideListFilter,
  LucideListOrdered,
  LucideListPlus,
  LucideNotebookTabs,
  LucidePackagePlus,
  LucideSettings,
  LucideUserPlus
} from 'lucide-react';

const siteConfig = {
  dashboardNav: {
    General: [
      {
        title: 'Dashboard',
        url: '#',
        icon: LucideLayoutDashboard
      },
      {
        title: 'Customers',
        url: '#',
        icon: LucideUserPlus
      },
      {
        title: 'Orders',
        url: '#',
        icon: LucideListOrdered,
        childrens: [
          { title: 'Details', url: '#', icon: LucideNotebookTabs },
          { title: 'List', url: '#', icon: LucideListPlus }
        ]
      },
      {
        title: 'Products',
        url: '#',
        icon: LucideLayers,
        childrens: [
          { title: 'Add Product', url: '#', icon: LucidePackagePlus },
          { title: 'Edit Product', url: '#', icon: LucideEdit3 },
          { title: 'Product List', url: '#', icon: LucideListFilter }
        ]
      },
      {
        title: 'Settings',
        url: '#',
        icon: LucideSettings
      }
    ]
  }
};

export default siteConfig;
export type SiteConfig = typeof siteConfig;
