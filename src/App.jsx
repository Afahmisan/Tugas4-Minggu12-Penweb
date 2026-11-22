import { useState } from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import DeleteModal from './DeleteModal';
import { filterProducts } from './utils/productUtils';

const INITIAL_PRODUCTS = [
    { id: 1, name: 'Pulpen', price: 5000 },
    { id: 2, name: 'Buku Tulis', price: 12000 },
    { id: 3, name: 'Spidol', price: 8000 },
    { id: 4, name: 'Penggaris', price: 6000 },
    { id: 5, name: 'Penghapus', price: 3000 },
];

function App() {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [nextId, setNextId] = useState(INITIAL_PRODUCTS.length + 1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const filteredProducts = filterProducts(products, searchQuery);

    function openAddModal() {
        setEditingProduct(null);
        setIsFormOpen(true);
    }

    function openEditModal(product) {
        setEditingProduct(product);
        setIsFormOpen(true);
    }

    function closeFormModal() {
        setIsFormOpen(false);
        setEditingProduct(null);
    }

    function handleSaveProduct({ name, price }) {
        if (editingProduct) {
            setProducts((prev) =>
                prev.map((item) =>
                    item.id === editingProduct.id ? { ...item, name, price } : item
                )
            );
        } else {
            setProducts((prev) => [...prev, { id: nextId, name, price }]);
            setNextId((prev) => prev + 1);
        }
        closeFormModal();
    }

    function handleDeleteProduct(productId) {
        setProducts((prev) => prev.filter((item) => item.id !== productId));
        setDeletingProduct(null);
    }

    return (
        <div className="page-shell">
            <main className="page-container">
                <Navbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onAddClick={openAddModal}
                    totalProducts={products.length}
                />

                {filteredProducts.length > 0 ? (
                    <section aria-label="Daftar produk" className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={openEditModal}
                                onDelete={setDeletingProduct}
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
                                    onClick={openAddModal}
                                    className="btn btn-primary"
                                >
                                    + Tambah Produk
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
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
                        Menampilkan {filteredProducts.length} dari {products.length} produk
                    </p>
                </footer>
            </main>

            {isFormOpen && (
                <ProductModal
                    key={editingProduct ? editingProduct.id : 'new'}
                    product={editingProduct}
                    onClose={closeFormModal}
                    onSave={handleSaveProduct}
                />
            )}

            {deletingProduct && (
                <DeleteModal
                    product={deletingProduct}
                    onClose={() => setDeletingProduct(null)}
                    onConfirm={handleDeleteProduct}
                />
            )}
        </div>
    );
}

export default App;
