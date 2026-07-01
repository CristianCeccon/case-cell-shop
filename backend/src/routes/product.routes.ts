import { Router } from "express";
import { listProducts } from "../services/product.service.js";

export const productRouter = Router();

productRouter.get("/", (_request, response) => {
  response.json(listProducts());
});
