import { useEffect, useMemo, useState } from "react";
import { CartSummary } from "./components/CartSummary";
import { ProductCard } from "./components/ProductCard";
import { createCheckout, getProducts } from "./services/api";
import type { CartItem } from "./types/cart";
import type { Product } from "./types/product";

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quantitiesByProduct = useMemo(() => {
    return cart.reduce<Record<string, number>>((quantities, item) => {
      quantities[item.productId] = item.quantity;
      return quantities;
    }, {});
  }, [cart]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setIsLoading(true);
      setProducts(await getProducts());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao carregar produtos.");
    } finally {
      setIsLoading(false);
    }
  }

  function addToCart(product: Product) {
    setMessage("");
    setCart((currentCart) => {
      const cartItem = currentCart.find((item) => item.productId === product.id);

      if (!cartItem) {
        return [{ productId: product.id, quantity: 1 }];
      }

      return [{ ...cartItem, quantity: cartItem.quantity + 1 }];
    });
  }

  function removeFromCart(product: Product) {
    setMessage("");
    setCart((currentCart) => {
      const cartItem = currentCart.find((item) => item.productId === product.id);

      if (!cartItem || cartItem.quantity === 1) {
        return currentCart.filter((item) => item.productId !== product.id);
      }

      return [{ ...cartItem, quantity: cartItem.quantity - 1 }];
    });
  }

  async function handleCheckout() {
    try {
      setIsSubmitting(true);
      const result = await createCheckout(cart);

      setCart([]);
      setMessage(`Pedido ${result.order.orderId.slice(0, 8)} finalizado com sucesso.`);
      await loadProducts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao finalizar pedido.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>CaseCellShop</h1>
          <p>Checkout simples de capinhas com estoque em memoria.</p>
        </div>
      </header>

      {message && <div className="message">{message}</div>}

      <section className="checkout-layout">
        <div className="product-list">
          {isLoading ? (
            <p className="muted">Carregando produtos...</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantitiesByProduct[product.id] ?? 0}
                onAdd={addToCart}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>

        <CartSummary
          cart={cart}
          products={products}
          isSubmitting={isSubmitting}
          onCheckout={handleCheckout}
        />
      </section>
    </main>
  );
}
