import type { CartItem, CheckoutResult } from "../types/cart";
import type { Product } from "../types/product";

const apiUrl = "http://localhost:3333";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${apiUrl}/products`);

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar os produtos.");
  }

  return response.json();
}

export async function createCheckout(items: CartItem[]): Promise<CheckoutResult> {
  const [item] = items;

  if (!item) {
    throw new Error("Selecione pelo menos uma capinha.");
  }

  const response = await fetch(`${apiUrl}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productId: item.productId,
      quantity: item.quantity
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Nao foi possivel finalizar o pedido.");
  }

  return data;
}
