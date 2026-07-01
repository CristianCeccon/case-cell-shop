import { randomUUID } from "node:crypto";
import { findProduct } from "./product.service.js";
import type { CheckoutResult } from "../types/checkout.js";

export class CheckoutError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
  }
}

export function checkout(productId: string | number | undefined, quantity: number): CheckoutResult {
  const normalizedProductId = productId === undefined || productId === null ? "" : String(productId).trim();

  if (normalizedProductId === "999") {
    throw new CheckoutError("API indisponivel no momento.", 503);
  }

  if (!normalizedProductId) {
    throw new CheckoutError("productId e obrigatorio.", 400);
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new CheckoutError("quantity deve ser maior que zero.", 400);
  }

  const product = findProduct(normalizedProductId);

  if (!product) {
    throw new CheckoutError("Produto nao encontrado.", 404);
  }

  if (product.stock < quantity) {
    throw new CheckoutError(`Estoque insuficiente para ${product.name}.`, 409);
  }

  product.stock -= quantity;

  return {
    message: "Pedido criado com sucesso.",
    order: {
      orderId: randomUUID(),
      productId: product.id,
      name: product.name,
      quantity,
      unitPriceInCents: product.priceInCents,
      totalInCents: product.priceInCents * quantity
    }
  };
}
