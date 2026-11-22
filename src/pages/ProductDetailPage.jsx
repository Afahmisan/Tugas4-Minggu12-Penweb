import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { fetchProductById } from '../utils/productApi';

function ProductDetailPage({ products, onEdit, onDelete }) {
    const { id } = useParams();
    const [retryTick, setRetryTick] = useState(0);
    const [detailState, setDetailState] = useState({
        id: null,
        product: null,
        errorInfo: null,
    });

    useEffect(() => {
        let cancelled = false;

        fetchProductById(id)
            .then((data) => {
                if (!cancelled) {
                    setDetailState({ id, product: data, errorInfo: null });
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setDetailState({
                        id,
                        product: null,
                        errorInfo: {
                            status: err.status ?? 0,
                            message: err.message || 'Gagal memuat detail produk.',
                        },
                    });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [id, retryTick]);

    function retryLoadDetail() {
        setDetailState({ id: null, product: null, errorInfo: null });
        setRetryTick((prev) => prev + 1);
    }

    const isLoading = detailState.id !== id;
    const errorInfo = isLoading ? null : detailState.errorInfo;
    const fetchedProduct = isLoading ? null : detailState.product;

    // Keep detail view synced after inline edits without an extra round-trip.
    const syncedProduct =
        fetchedProduct &&
        products.find((item) => item.id === fetchedProduct.id);
    const product = syncedProduct || fetchedProduct;

    if (isLoading) {
        return (
            <div>
                <div className="breadcrumb-row">
                    <Link to="/products" className="inline-link">
                        Kembali ke Daftar Produk
                    </Link>
                </div>

                <section
                    className="status-panel"
                    role="status"
                    aria-live="polite"
                >
                    <p className="status-title">Memuat detail produk...</p>
                    <p className="status-desc">
                        Mengambil data produk ID {id} dari server backend ExpressJS.
                    </p>
                </section>
            </div>
        );
    }

    if (errorInfo && (errorInfo.status === 404 || errorInfo.status === 400)) {
        return (
            <div>
                <div className="breadcrumb-row">
                    <Link to="/products" className="inline-link">
                        Kembali ke Daftar Produk
                    </Link>
                </div>

                <section
                    className="empty-panel"
                    aria-labelledby="missing-product-title"
                >
                    <h1 id="missing-product-title" className="empty-title">
                        Produk Tidak Ditemukan
                    </h1>
                    <p className="empty-desc">
                        Produk dengan ID &quot;{id}&quot; tidak tersedia dalam database.
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

    if (errorInfo || !product) {
        return (
            <div>
                <div className="breadcrumb-row">
                    <Link to="/products" className="inline-link">
                        Kembali ke Daftar Produk
                    </Link>
                </div>

                <section className="error-panel" role="alert">
                    <h1 className="error-title">Gagal Memuat Detail Produk</h1>
                    <p className="error-desc">
                        {errorInfo?.message || 'Data produk tidak dapat dimuat.'}
                    </p>
                    <div className="empty-actions">
                        <button
                            type="button"
                            onClick={retryLoadDetail}
                            className="btn btn-primary"
                        >
                            Coba Lagi
                        </button>
                        <Link to="/products" className="btn btn-neutral">
                            Kembali ke Daftar Produk
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    const productIndex = products.findIndex((item) => item.id === product.id);
    const catalogPosition =
        productIndex >= 0
            ? `Produk ke-${productIndex + 1} dari ${products.length}`
            : 'Tersimpan di PostgreSQL via ExpressJS';

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
                        <dd className="detail-meta-value">
                            {formatPrice(product.price)}
                        </dd>
                    </div>
                    <div className="detail-meta-item">
                        <dt className="detail-meta-label">Posisi di Katalog</dt>
                        <dd className="detail-meta-value">{catalogPosition}</dd>
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
