export type CartItem = {
  productId: string;
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
