import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
};

export function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  const hasStock = product.stock > 0;

  return (
    <article className="product-card">
      <div>
        <h2>{product.name}</h2>
        <p>
          {product.phoneModel} - {product.color}
        </p>
      </div>

      <strong>{formatCurrency(product.priceInCents)}</strong>

      <div className="product-footer">
        <span>Estoque: {product.stock}</span>
        <div className="quantity-controls">
          <button type="button" onClick={() => onRemove(product)} disabled={quantity === 0}>
            -
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={() => onAdd(product)} disabled={!hasStock || quantity >= product.stock}>
            +
          </button>
        </div>
      </div>
    </article>
  );
}

function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valueInCents / 100);
}
