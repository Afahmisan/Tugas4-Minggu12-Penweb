import { useEffect, useRef, useState } from 'react';
import { validateProductInput } from './utils/productUtils';

function ProductModal({
    product,
    isSubmitting = false,
    submitError = '',
    onClose,
    onSave,
}) {
    const isEdit = Boolean(product);
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? String(product.price) : '');
    const [error, setError] = useState('');
    const nameInputRef = useRef(null);

    useEffect(() => {
        nameInputRef.current?.focus();

        function handleKeyDown(e) {
            if (e.key === 'Escape' && !isSubmitting) {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSubmitting, onClose]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;

        const result = validateProductInput(name, price);
        if (result.error) {
            setError(result.error);
            return;
        }

        onSave(result.data);
    }

    const displayError = error || submitError;
    const submitLabel = isSubmitting
        ? 'Menyimpan...'
        : isEdit
          ? 'Simpan Perubahan'
          : 'Simpan Produk';

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget && !isSubmitting) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-modal-title"
                className="modal-dialog"
            >
                <div className="modal-header">
                    <div>
                        <h2 id="product-modal-title" className="modal-title">
                            {isEdit ? 'Edit Produk' : 'Tambah Produk'}
                        </h2>
                        <p className="modal-subtitle">
                            {isEdit
                                ? 'Perbarui informasi produk yang dipilih.'
                                : 'Masukkan informasi produk baru.'}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        aria-label="Tutup modal"
                        className="btn-icon-close"
                    >
                        <svg
                            aria-hidden="true"
                            className="modal-close-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {isEdit && <span className="modal-edit-badge">ID: {product.id}</span>}

                <form onSubmit={handleSubmit} noValidate className="modal-form">
                    {displayError && (
                        <p role="alert" className="alert-error">
                            {displayError}
                        </p>
                    )}

                    <div>
                        <label htmlFor="product-name" className="form-label">
                            Nama Produk
                        </label>
                        <input
                            ref={nameInputRef}
                            id="product-name"
                            type="text"
                            value={name}
                            disabled={isSubmitting}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Contoh: Pulpen"
                            className="form-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="product-price" className="form-label">
                            Harga (Rp)
                        </label>
                        <input
                            id="product-price"
                            type="number"
                            min="1"
                            step="1"
                            value={price}
                            disabled={isSubmitting}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Contoh: 5000"
                            className="form-input"
                        />
                        <p className="form-hint">Harga harus lebih dari 0.</p>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="btn btn-neutral"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                        >
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductModal;
