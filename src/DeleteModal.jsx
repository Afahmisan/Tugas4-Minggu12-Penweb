import { useEffect, useRef } from 'react';
import { formatPrice } from './utils/formatPrice';

function DeleteModal({ product, onClose, onConfirm }) {
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        cancelButtonRef.current?.focus();

        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                className="modal-dialog-sm"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup modal"
                    className="delete-close-btn"
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

                <div className="delete-icon-wrap">
                    <svg
                        aria-hidden="true"
                        className="delete-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </div>

                <h2 id="delete-modal-title" className="delete-title">
                    Hapus Produk?
                </h2>
                <p className="delete-desc">
                    Produk yang dihapus tidak dapat dikembalikan.
                </p>

                <div className="delete-preview">
                    <span className="product-id-badge">ID: {product.id}</span>
                    <p className="delete-preview-name">{product.name}</p>
                    <p className="delete-preview-price">
                        {formatPrice(product.price)}
                    </p>
                </div>

                <div className="delete-actions">
                    <button
                        ref={cancelButtonRef}
                        type="button"
                        onClick={onClose}
                        className="btn btn-neutral"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={() => onConfirm(product.id)}
                        className="btn btn-danger-solid"
                    >
                        Hapus Produk
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
