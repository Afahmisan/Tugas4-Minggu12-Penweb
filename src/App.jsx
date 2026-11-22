import { useState } from 'react';
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductModal from './ProductModal';
import DeleteModal from './DeleteModal';
import { normalizeViewMode } from './utils/productUtils';

const INITIAL_PRODUCTS = [
    { id: 1, name: 'Pulpen', price: 5000 },
    { id: 2, name: 'Buku Tulis', price: 12000 },
    { id: 3, name: 'Spidol', price: 8000 },
    { id: 4, name: 'Penggaris', price: 6000 },
    { id: 5, name: 'Penghapus', price: 3000 },
];

const VIEW_MODE_STORAGE_KEY = 'productViewMode';

function loadInitialViewMode() {
    try {
        return normalizeViewMode(window.localStorage.getItem(VIEW_MODE_STORAGE_KEY));
    } catch {
        return 'grid';
    }
}

function App() {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [nextId, setNextId] = useState(INITIAL_PRODUCTS.length + 1);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState(loadInitialViewMode);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    function handleViewModeChange(nextMode) {
        const normalized = normalizeViewMode(nextMode);
        setViewMode(normalized);
        try {
            window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, normalized);
        } catch {
            // Abaikan jika localStorage tidak tersedia.
        }
    }

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

        if (location.pathname === `/products/${productId}`) {
            navigate('/products', { replace: true });
        }
    }

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout
                            totalProducts={products.length}
                            viewMode={viewMode}
                        />
                    }
                >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route
                        path="dashboard"
                        element={
                            <DashboardPage
                                products={products}
                                viewMode={viewMode}
                                onAddClick={openAddModal}
                            />
                        }
                    />
                    <Route
                        path="products"
                        element={
                            <ProductsPage
                                products={products}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                viewMode={viewMode}
                                onAddClick={openAddModal}
                                onEdit={openEditModal}
                                onDelete={setDeletingProduct}
                            />
                        }
                    />
                    <Route
                        path="products/:id"
                        element={
                            <ProductDetailPage
                                products={products}
                                onEdit={openEditModal}
                                onDelete={setDeletingProduct}
                            />
                        }
                    />
                    <Route
                        path="settings"
                        element={
                            <SettingsPage
                                viewMode={viewMode}
                                onViewModeChange={handleViewModeChange}
                            />
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>

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
        </>
    );
}

export default App;
