import { BuyerNavLinks, NavbarLink } from "@/types";

export const navbarLinks: NavbarLink[] = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/about",
    label: "About",
  },
  {
    route: "/market",
    label: "Market",
  },
  {
    route: "/contact",
    label: "Contact",
  },
];

export const buyerNavLinks: BuyerNavLinks[] = [
  {
    route: "/buyer/overview",
    label: "Dashboard",
    icon: "/images/icons/menu-grid.svg",
    isBottom: false,
  },
  {
    route: "/buyer/branches",
    label: "Branches",
    icon: "/images/icons/branch.svg",
    isBottom: false,
  },
  {
    route: "/buyer/orders",
    label: "My Orders",
    icon: "/images/icons/cart.svg",
    isBottom: false,
  },
  {
    route: "/buyer/sellers",
    label: "Sellers",
    icon: "/images/icons/tanker-truck.svg",
    isBottom: false,
  },
  {
    route: "/buyer/analytics",
    label: "Analytics",
    icon: "/images/icons/analytics.svg",
    isBottom: false,
  },
  {
    route: "/buyer/settings",
    label: "Settings",
    icon: "/images/icons/settings.svg",
    isBottom: true,
  },
];
