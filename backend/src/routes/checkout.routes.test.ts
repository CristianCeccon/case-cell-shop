import request from "supertest";
import { app } from "../app.js";
import { resetProducts } from "../data/products.js";

describe("POST /checkout", () => {
  beforeEach(() => {
    resetProducts();
  });

  it("deve comprar com sucesso", async () => {
    const response = await request(app).post("/checkout").send({
      productId: "case-iphone-15-clear",
      quantity: 2
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Pedido criado com sucesso.",
      order: expect.objectContaining({
        orderId: expect.any(String),
        productId: "case-iphone-15-clear",
        name: "Capinha Clear Case",
        quantity: 2,
        unitPriceInCents: 7990,
        totalInCents: 15980
      })
    });

    const productsResponse = await request(app).get("/products");
    const product = productsResponse.body.find(
      (currentProduct: { id: string }) => currentProduct.id === "case-iphone-15-clear"
    );

    expect(product.stock).toBe(6);
  });

  it("deve retornar 400 para quantidade invalida", async () => {
    const response = await request(app).post("/checkout").send({
      productId: "case-iphone-15-clear",
      quantity: 0
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "quantity deve ser maior que zero."
    });
  });

  it("deve retornar 404 para produto inexistente", async () => {
    const response = await request(app).post("/checkout").send({
      productId: "produto-inexistente",
      quantity: 1
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Produto nao encontrado."
    });
  });

  it("deve retornar 409 para estoque insuficiente", async () => {
    const response = await request(app).post("/checkout").send({
      productId: "case-moto-g84-blue",
      quantity: 4
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: "Estoque insuficiente para Capinha Anti Impacto."
    });
  });

  it("deve retornar 503 para API indisponivel simulada", async () => {
    const response = await request(app).post("/checkout").send({
      productId: "999",
      quantity: 1
    });

    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      message: "API indisponivel no momento."
    });
  });
});
