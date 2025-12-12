import { CardSimIcon, Home, Table2, type LucideIcon } from "lucide-react";

export interface NavItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
  url: string;
}

export const navItems = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    url: '/home'
  },
  {
    id: 'table',
    label: 'Table View',
    icon: Table2,
    url: '/table'
  },
  {
    id: 'cards',
    label: 'Cards',
    icon: CardSimIcon,
    url: '/cards'
  },
];