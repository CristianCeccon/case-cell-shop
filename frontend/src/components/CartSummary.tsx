import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

type CartSummaryProps = {
  cart: CartItem[];
  products: Product[];
  isSubmitting: boolean;
  onCheckout: () => void;
};

export function CartSummary({ cart, products, isSubmitting, onCheckout }: CartSummaryProps) {
  const selectedItems = cart
    .map((item) => {
      const product = products.find((currentProduct) => currentProduct.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is CartItem & { product: Product } => item !== null);

  const totalInCents = selectedItems.reduce(
    (total, item) => total + item.product.priceInCents * item.quantity,
    0
  );

  return (
    <aside className="cart-summary">
      <h2>Resumo</h2>

      {selectedItems.length === 0 ? (
        <p className="muted">Selecione uma capinha para iniciar o pedido.</p>
      ) : (
        <ul>
          {selectedItems.map((item) => (
            <li key={item.productId}>
              <span>
                {item.quantity}x {item.product.name}
              </span>
              <strong>{formatCurrency(item.product.priceInCents * item.quantity)}</strong>
            </li>
          ))}
        </ul>
      )}

      <div className="total-row">
        <span>Total</span>
        <strong>{formatCurrency(totalInCents)}</strong>
      </div>

      <button type="button" className="checkout-button" onClick={onCheckout} disabled={selectedItems.length === 0 || isSubmitting}>
        {isSubmitting ? "Finalizando..." : "Finalizar pedido"}
      </button>
    </aside>
  );
}

function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valueInCents / 100);
}
