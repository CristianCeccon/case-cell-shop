import type { Product } from "../types/product.js";

const initialProducts: Product[] = [
  {
    id: "case-iphone-15-clear",
    name: "Capinha Clear Case",
    phoneModel: "iPhone 15",
    color: "Transparente",
    priceInCents: 7990,
    stock: 8
  },
  {
    id: "case-galaxy-s24-black",
    name: "Capinha Silicone Soft",
    phoneModel: "Galaxy S24",
    color: "Preta",
    priceInCents: 6990,
    stock: 5
  },
  {
    id: "case-moto-g84-blue",
    name: "Capinha Anti Impacto",
    phoneModel: "Moto G84",
    color: "Azul",
    priceInCents: 8990,
    stock: 3
  },
  {
    id: "case-redmi-note-13-pink",
    name: "Capinha Matte",
    phoneModel: "Redmi Note 13",
    color: "Rosa",
    priceInCents: 5990,
    stock: 6
  }
];

export const products: Product[] = initialProducts.map((product) => ({ ...product }));

export function resetProducts() {
  products.splice(0, products.length, ...initialProducts.map((product) => ({ ...product })));
}
