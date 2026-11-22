import Navbar from '../Navbar';
import ProductCard from '../ProductCard';
import { filterProducts } from '../utils/productUtils';

function ProductsPage({
    products,
    searchQuery,
    onSearchChange,
    viewMode,
    isLoading = false,
    loadError = '',
    onRetry,
    onAddClick,
    onEdit,
    onDelete,
}) {
    const filteredProducts = filterProducts(products, searchQuery);
    const listClassName = viewMode === 'list' ? 'products-list' : 'products-grid';

    return (
        <div>
            <Navbar
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onAddClick={onAddClick}
                totalProducts={products.length}
                viewMode={viewMode}
            />

            {isLoading ? (
                <section
                    className="status-panel"
                    role="status"
                    aria-live="polite"
                >
                    <p className="status-title">Memuat daftar produk...</p>
                    <p className="status-desc">
                        Mengambil data produk dari server backend ExpressJS.
                    </p>
                </section>
            ) : loadError ? (
                <section className="error-panel" role="alert">
                    <p className="error-title">Gagal Memuat Daftar Produk</p>
                    <p className="error-desc">{loadError}</p>
                    <div className="empty-actions">
                        <button
                            type="button"
                            onClick={onRetry}
                            className="btn btn-primary"
                        >
                            Coba Lagi
                        </button>
                    </div>
                </section>
            ) : (
                <>
                    {filteredProducts.length > 0 ? (
                        <section aria-label="Daftar produk" className={listClassName}>
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    viewMode={viewMode}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </section>
                    ) : (
                        <div className="empty-panel">
                            <p className="empty-title">
                                {products.length === 0
                                    ? 'Belum ada produk yang tersimpan.'
                                    : `Tidak ada produk dengan kata kunci "${searchQuery.trim()}".`}
                            </p>
                            <p className="empty-desc">
                                {products.length === 0
                                    ? 'Tambahkan produk pertama Anda menggunakan tombol di bawah ini.'
                                    : 'Coba gunakan kata kunci lain atau tampilkan semua produk.'}
                            </p>
                            <div className="empty-actions">
                                {products.length === 0 ? (
                                    <button
                                        type="button"
                                        onClick={onAddClick}
                                        className="btn btn-primary"
                                    >
                                        + Tambah Produk
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => onSearchChange('')}
                                        className="btn btn-secondary"
                                    >
                                        Reset Pencarian
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <footer className="list-footer">
                        <p className="list-footer-text">
                            Menampilkan {filteredProducts.length} dari {products.length}{' '}
                            produk (mode {viewMode === 'list' ? 'List' : 'Grid'})
                        </p>
                    </footer>
                </>
            )}
        </div>
    );
}

export default ProductsPage;
