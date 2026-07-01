export type CheckoutItem = {
  productId: string;
  quantity: number;
};

export type CheckoutRequest = {
  productId: string | number;
  quantity: number;
};

export type CheckoutOrder = {
  orderId: string;
  productId: string;
  name: string;
  quantity: number;
  unitPriceInCents: number;
  totalInCents: number;
};

export type CheckoutResult = {
  message: string;
  order: CheckoutOrder;
};
