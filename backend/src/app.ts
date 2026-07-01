import cors from "cors";
import express from "express";
import { checkoutRouter } from "./routes/checkout.routes.js";
import { productRouter } from "./routes/product.routes.js";

export const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/products", productRouter);
app.use("/checkout", checkoutRouter);
