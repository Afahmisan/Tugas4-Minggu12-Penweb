import { useEffect, useState } from 'react';
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
import {
    createProduct,
    deleteProduct,
    fetchProducts,
    updateProduct,
} from './utils/productApi';
import { normalizeViewMode } from './utils/productUtils';

const VIEW_MODE_STORAGE_KEY = 'productViewMode';

function loadInitialViewMode() {
    try {
        return normalizeViewMode(window.localStorage.getItem(VIEW_MODE_STORAGE_KEY));
    } catch {
        return 'grid';
    }
}

function App() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [reloadTick, setReloadTick] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalError, setModalError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState(loadInitialViewMode);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let cancelled = false;

        fetchProducts()
            .then((data) => {
                if (!cancelled) {
                    setProducts(Array.isArray(data) ? data : []);
                    setLoadError('');
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setLoadError(err.message || 'Gagal memuat daftar produk.');
                    setIsLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [reloadTick]);

    function retryLoadProducts() {
        setIsLoading(true);
        setLoadError('');
        setReloadTick((prev) => prev + 1);
    }

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
        setModalError('');
        setIsFormOpen(true);
    }

    function openEditModal(product) {
        setEditingProduct(product);
        setModalError('');
        setIsFormOpen(true);
    }

    function openDeleteModal(product) {
        setModalError('');
        setDeletingProduct(product);
    }

    function closeFormModal() {
        if (isSubmitting) return;
        setIsFormOpen(false);
        setEditingProduct(null);
        setModalError('');
    }

    function closeDeleteModal() {
        if (isSubmitting) return;
        setDeletingProduct(null);
        setModalError('');
    }

    async function handleSaveProduct({ name, price }) {
        setIsSubmitting(true);
        setModalError('');
        try {
            if (editingProduct) {
                const updated = await updateProduct(editingProduct.id, {
                    name,
                    price,
                });
                setProducts((prev) =>
                    prev.map((item) =>
                        item.id === editingProduct.id ? updated : item
                    )
                );
            } else {
                const created = await createProduct({ name, price });
                setProducts((prev) => [...prev, created]);
            }
            setIsFormOpen(false);
            setEditingProduct(null);
        } catch (err) {
            setModalError(err.message || 'Gagal menyimpan produk.');
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteProduct(productId) {
        setIsSubmitting(true);
        setModalError('');
        try {
            await deleteProduct(productId);
            setProducts((prev) => prev.filter((item) => item.id !== productId));
            setDeletingProduct(null);

            if (location.pathname === `/products/${productId}`) {
                navigate('/products', { replace: true });
            }
        } catch (err) {
            setModalError(err.message || 'Gagal menghapus produk.');
        } finally {
            setIsSubmitting(false);
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
                                isLoading={isLoading}
                                loadError={loadError}
                                onRetry={retryLoadProducts}
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
                                isLoading={isLoading}
                                loadError={loadError}
                                onRetry={retryLoadProducts}
                                onAddClick={openAddModal}
                                onEdit={openEditModal}
                                onDelete={openDeleteModal}
                            />
                        }
                    />
                    <Route
                        path="products/:id"
                        element={
                            <ProductDetailPage
                                products={products}
                                onEdit={openEditModal}
                                onDelete={openDeleteModal}
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
                    isSubmitting={isSubmitting}
                    submitError={modalError}
                    onClose={closeFormModal}
                    onSave={handleSaveProduct}
                />
            )}

            {deletingProduct && (
                <DeleteModal
                    product={deletingProduct}
                    isSubmitting={isSubmitting}
                    submitError={modalError}
                    onClose={closeDeleteModal}
                    onConfirm={handleDeleteProduct}
                />
            )}
        </>
    );
}

export default App;
