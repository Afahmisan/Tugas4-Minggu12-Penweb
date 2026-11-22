import { Link } from 'react-router-dom';
import { formatPrice } from './utils/formatPrice';

function ProductCard({ product, viewMode = 'grid', onEdit, onDelete }) {
    const isList = viewMode === 'list';

    return (
        <article
            className={
                isList ? 'product-card product-card-list' : 'product-card'
            }
        >
            <div
                className={
                    isList
                        ? 'product-card-body product-card-list-body'
                        : 'product-card-body'
                }
            >
                <span className="product-id-badge">ID: {product.id}</span>
                <h2
                    className={
                        isList
                            ? 'product-card-title product-card-list-title'
                            : 'product-card-title'
                    }
                >
                    <Link
                        to={`/products/${product.id}`}
                        className="product-title-link"
                    >
                        {product.name}
                    </Link>
                </h2>
                <p
                    className={
                        isList
                            ? 'product-card-price product-card-list-price'
                            : 'product-card-price'
                    }
                >
                    {formatPrice(product.price)}
                </p>
            </div>

            {isList ? (
                <div className="product-list-actions">
                    <Link
                        to={`/products/${product.id}`}
                        className="btn btn-neutral btn-compact"
                    >
                        Lihat Detail
                    </Link>
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
            ) : (
                <div className="product-card-actions">
                    <Link
                        to={`/products/${product.id}`}
                        className="btn btn-neutral btn-compact btn-full"
                    >
                        Lihat Detail
                    </Link>
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
            )}
        </article>
    );
}

export default ProductCard;
