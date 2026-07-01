import { products } from "../data/products.js";
import type { Product } from "../types/product.js";

export function listProducts(): Product[] {
  return products;
}

export function findProduct(productId: string): Product | undefined {
  return products.find((product) => product.id === productId);
}
