import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { findProductById } from '../utils/productUtils';

function ProductDetailPage({ products, onEdit, onDelete }) {
    const { id } = useParams();
    const product = findProductById(products, id);

    if (!product) {
        return (
            <div>
                <div className="breadcrumb-row">
                    <Link to="/products" className="inline-link">
                        Kembali ke Daftar Produk
                    </Link>
                </div>

                <section className="empty-panel" aria-labelledby="missing-product-title">
                    <h1 id="missing-product-title" className="empty-title">
                        Produk Tidak Ditemukan
                    </h1>
                    <p className="empty-desc">
                        Produk dengan ID &quot;{id}&quot; tidak tersedia dalam daftar saat ini.
                    </p>
                    <div className="empty-actions">
                        <Link to="/products" className="btn btn-primary">
                            Kembali ke Daftar Produk
                        </Link>
                        <Link to="/dashboard" className="btn btn-neutral">
                            Ke Dashboard
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    const productIndex = products.findIndex((item) => item.id === product.id);

    return (
        <div>
            <div className="breadcrumb-row">
                <Link to="/products" className="inline-link">
                    Kembali ke Daftar Produk
                </Link>
            </div>

            <article className="detail-card">
                <header className="detail-header">
                    <div>
                        <span className="product-id-badge">ID: {product.id}</span>
                        <h1 className="detail-title">{product.name}</h1>
                    </div>
                    <p className="detail-price">{formatPrice(product.price)}</p>
                </header>

                <dl className="detail-meta-list">
                    <div className="detail-meta-item">
                        <dt className="detail-meta-label">ID Produk</dt>
                        <dd className="detail-meta-value">#{product.id}</dd>
                    </div>
                    <div className="detail-meta-item">
                        <dt className="detail-meta-label">Nama Produk</dt>
                        <dd className="detail-meta-value">{product.name}</dd>
                    </div>
                    <div className="detail-meta-item">
                        <dt className="detail-meta-label">Harga Satuan</dt>
                        <dd className="detail-meta-value">{formatPrice(product.price)}</dd>
                    </div>
                    <div className="detail-meta-item">
                        <dt className="detail-meta-label">Posisi di Katalog</dt>
                        <dd className="detail-meta-value">
                            Produk ke-{productIndex + 1} dari {products.length}
                        </dd>
                    </div>
                </dl>

                <div className="detail-actions">
                    <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="btn btn-secondary"
                    >
                        Edit Produk
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(product)}
                        className="btn btn-danger"
                    >
                        Hapus Produk
                    </button>
                    <Link to="/products" className="btn btn-neutral">
                        Kembali ke Daftar Produk
                    </Link>
                </div>
            </article>
        </div>
    );
}

export default ProductDetailPage;
