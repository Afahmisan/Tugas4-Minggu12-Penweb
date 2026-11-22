import { formatPrice } from './utils/formatPrice';

function ProductCard({ product, onEdit, onDelete }) {
    return (
        <article className="product-card">
            <div className="product-card-body">
                <span className="product-id-badge">ID: {product.id}</span>
                <h2 className="product-card-title">{product.name}</h2>
                <p className="product-card-price">{formatPrice(product.price)}</p>
            </div>

            <div className="product-card-actions">
                <div className="product-card-actions-row">
                    <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="btn btn-secondary btn-compact"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(product)}
                        className="btn btn-danger btn-compact"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;
