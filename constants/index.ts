import { DashboardNavLinks, NavbarLink } from "@/types";

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

export const buyerNavLinks: DashboardNavLinks[] = [
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

export const sellerNavLinks: DashboardNavLinks[] = [
  {
    route: "/seller/overview",
    label: "Dashboard",
    icon: "/images/icons/menu-grid.svg",
    isBottom: false,
  },
  {
    route: "/seller/account",
    label: "Account",
    icon: "/images/icons/account.svg",
    isBottom: false,
  },
  {
    route: "/seller/products",
    label: "Products",
    icon: "/images/icons/product.svg",
    isBottom: false,
  },
  {
    route: "/seller/orders",
    label: "Orders",
    icon: "/images/icons/cart.svg",
    isBottom: false,
  },
  {
    route: "/seller/analytics",
    label: "Analytics",
    icon: "/images/icons/analytics.svg",
    isBottom: false,
  },
  {
    route: "/seller/settings",
    label: "Settings",
    icon: "/images/icons/settings.svg",
    isBottom: true,
  },
];

export const adminNavLinks: DashboardNavLinks[] = [
  {
    route: "/admin/overview",
    label: "Dashboard",
    icon: "/images/icons/menu-grid.svg",
    isBottom: false,
  },
  {
    route: "/admin/account",
    label: "Account",
    icon: "/images/icons/account.svg",
    isBottom: false,
  },
  {
    route: "/admin/orders",
    label: "Orders",
    icon: "/images/icons/cart.svg",
    isBottom: false,
  },
  {
    route: "/admin/sellers",
    label: "Sellers",
    icon: "/images/icons/tanker-truck.svg",
    isBottom: false,
  },
  {
    route: "/admin/buyers",
    label: "Buyers",
    icon: "/images/icons/buyer.svg",
    isBottom: false,
  },
  // {
  //   route: "/admin/drivers",
  //   label: "Drivers",
  //   icon: "/images/icons/drivers.svg",
  //   isBottom: false,
  // },
  {
    route: "/admin/transactions",
    label: "Transactions",
    icon: "/images/icons/transaction.svg",
    isBottom: false,
  },

  {
    route: "/admin/analytics",
    label: "Analytics",
    icon: "/images/icons/analytics.svg",
    isBottom: false,
  },
  {
    route: "/admin/disputes",
    label: "Disputes",
    icon: "/images/icons/disputes.svg",
    isBottom: false,
  },
  {
    route: "/admin/settings",
    label: "Settings",
    icon: "/images/icons/settings.svg",
    isBottom: true,
  },
];

export const orderFilters = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "In Progress",
    value: "progress",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
];

export const userFilters = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Suspended",
    value: "suspended",
  },
];
