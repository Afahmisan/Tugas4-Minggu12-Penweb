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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
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
                className="relative w-full max-w-sm bg-white border border-[#E5E7E9] rounded-xl shadow-xl p-6"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup modal"
                    className="absolute right-3 top-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#5B6270] hover:text-[#212121] hover:bg-gray-100 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AA5B]"
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
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

                <div className="w-12 h-12 rounded-xl bg-[#FFF0F3] text-[#D91B42] flex items-center justify-center mx-auto">
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6"
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

                <h2
                    id="delete-modal-title"
                    className="text-lg font-bold text-[#212121] mt-4 text-center"
                >
                    Hapus Produk?
                </h2>
                <p className="text-sm text-[#5B6270] mt-1 text-center">
                    Produk yang dihapus tidak dapat dikembalikan.
                </p>

                <div className="mt-4 bg-[#F8FAFC] border border-[#E5E7E9] rounded-lg p-3.5 text-left">
                    <span className="inline-block text-xs font-semibold text-[#007A3D] bg-[#EBFBF1] px-2 py-0.5 rounded-md">
                        ID: {product.id}
                    </span>
                    <p className="text-base font-bold text-[#212121] mt-1.5 break-words">
                        {product.name}
                    </p>
                    <p className="text-base font-extrabold text-[#008040] mt-0.5 tabular-nums">
                        {formatPrice(product.price)}
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                        ref={cancelButtonRef}
                        type="button"
                        onClick={onClose}
                        className="min-h-[44px] px-4 py-2 text-sm font-semibold text-[#212121] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F8FAFC] transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AA5B]"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={() => onConfirm(product.id)}
                        className="min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-[#D91B42] hover:bg-[#B81436] rounded-lg transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91B42]"
                    >
                        Hapus Produk
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
