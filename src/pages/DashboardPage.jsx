import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { summarizeProducts } from '../utils/productUtils';

function DashboardPage({ products, viewMode, onAddClick }) {
    const { count, totalValue, minPrice, maxPrice } = summarizeProducts(products);
    const viewLabel = viewMode === 'list' ? 'List' : 'Grid';

    return (
        <div>
            <header className="page-header">
                <div>
                    <h1 className="page-heading">Dashboard Katalog</h1>
                    <p className="page-lead">
                        Ringkasan data produk aktif dan akses cepat ke halaman pengelolaan.
                    </p>
                </div>

                <div className="header-actions">
                    <Link to="/products" className="btn btn-secondary">
                        Kelola Produk
                    </Link>
                    <button
                        type="button"
                        onClick={onAddClick}
                        className="btn btn-primary"
                    >
                        + Tambah Produk
                    </button>
                </div>
            </header>

            <section aria-label="Ringkasan katalog" className="summary-grid">
                <article className="summary-card">
                    <span className="summary-label">Total Produk</span>
                    <p className="summary-value">{count}</p>
                    <p className="summary-note">
                        {count === 0
                            ? 'Belum ada produk tersimpan'
                            : 'Produk aktif dalam daftar'}
                    </p>
                </article>

                <article className="summary-card">
                    <span className="summary-label">Total Nilai Satuan</span>
                    <p className="summary-value">{formatPrice(totalValue)}</p>
                    <p className="summary-note">
                        {count === 0
                            ? 'Tambahkan produk untuk menghitung nilai'
                            : `Rentang ${formatPrice(minPrice)} s.d. ${formatPrice(maxPrice)}`}
                    </p>
                </article>

                <article className="summary-card">
                    <span className="summary-label">Mode Tampilan Produk</span>
                    <p className="summary-value">{viewLabel}</p>
                    <div>
                        <Link to="/settings" className="inline-link">
                            Ubah di Settings
                        </Link>
                    </div>
                </article>
            </section>

            <section aria-label="Daftar ringkas produk" className="dashboard-panel">
                <div className="panel-header">
                    <h2 className="panel-title">Daftar Produk Saat Ini</h2>
                    <Link to="/products" className="inline-link">
                        Buka Halaman Produk
                    </Link>
                </div>

                {products.length > 0 ? (
                    <ul className="quick-list">
                        {products.map((product) => (
                            <li key={product.id} className="quick-row">
                                <div className="quick-row-main">
                                    <span className="product-id-badge">
                                        ID: {product.id}
                                    </span>
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="quick-row-name"
                                    >
                                        {product.name}
                                    </Link>
                                </div>

                                <div className="quick-row-meta">
                                    <span className="quick-row-price">
                                        {formatPrice(product.price)}
                                    </span>
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="inline-link"
                                    >
                                        Detail
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty-actions">
                        <p className="empty-desc">
                            Belum ada produk yang tersimpan di katalog.
                        </p>
                        <button
                            type="button"
                            onClick={onAddClick}
                            className="btn btn-primary"
                        >
                            + Tambah Produk
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default DashboardPage;
