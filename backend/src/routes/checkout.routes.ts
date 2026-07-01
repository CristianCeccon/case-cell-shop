import { Router } from "express";
import { CheckoutError, checkout } from "../services/checkout.service.js";
import type { CheckoutRequest } from "../types/checkout.js";

export const checkoutRouter = Router();

checkoutRouter.post("/", (request, response) => {
  try {
    const body = (request.body ?? {}) as Partial<CheckoutRequest>;
    const result = checkout(body.productId, Number(body.quantity));

    response.status(201).json(result);
  } catch (error) {
    if (error instanceof CheckoutError) {
      response.status(error.statusCode).json({ message: error.message });
      return;
    }

    response.status(500).json({
      message: error instanceof Error ? error.message : "Nao foi possivel finalizar o checkout."
    });
  }
});
