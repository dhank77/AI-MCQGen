import { Home, Settings, QuoteIcon } from "lucide-react";

export const sidebarLink = [
  {
    imageIcon : Home,
    route : '/admin/',
    label : 'Dashboard'
  },
  {
    imageIcon : QuoteIcon,
    route : '/admin/quiz/',
    label : 'Quiz'
  },
  {
    imageIcon : Settings,
    route : '/admin/change-password/',
    label : 'Manage Password'
  },
]
