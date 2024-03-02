export interface NavbarLink {
  route: string;
  label: string;
}

export interface DashboardNavLinks {
  route: string;
  label: string;
  icon: string;
  isBottom: boolean;
}

export interface OrderCreatedToBuyer {
  email: string;
  amount: string;
  businessName: string;
  orderNumber: string;
}

export interface OrderCreatedToSeller {
  email: string;
  businessName: string;
  orderNumber: string;
  quantity: string;
  deliveryLocation: string;
}

export interface OrderCreatedToAdmin {
  businessName: string;
  orderNumber: string;
  quantity: string;
}

export interface OrderPaymentToBuyer {
  email: string;
  amount: string;
  businessName: string;
  reference: string;
}

export interface OrderPaymentToSeller {
  email: string;
  businessName: string;
  orderNumber: string;
  quantity: string;
  deliveryLocation: string;
}

export interface OrderPaymentToAdmin {
  businessName: string;
  orderNumber: string;
  quantity: string;
}
