import { useEffect, useRef, useState } from 'react';
import { validateProductInput } from './utils/productUtils';

function ProductModal({ product, onClose, onSave }) {
    const isEdit = Boolean(product);
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? String(product.price) : '');
    const [error, setError] = useState('');
    const nameInputRef = useRef(null);

    useEffect(() => {
        nameInputRef.current?.focus();

        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    function handleSubmit(e) {
        e.preventDefault();

        const result = validateProductInput(name, price);
        if (result.error) {
            setError(result.error);
            return;
        }

        onSave(result.data);
    }

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
                aria-labelledby="product-modal-title"
                className="w-full max-w-md bg-white border border-[#E5E7E9] rounded-xl shadow-xl p-6"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="product-modal-title"
                            className="text-lg font-bold text-[#212121]"
                        >
                            {isEdit ? 'Edit Produk' : 'Tambah Produk'}
                        </h2>
                        <p className="text-sm text-[#5B6270] mt-0.5">
                            {isEdit
                                ? 'Perbarui informasi produk yang dipilih.'
                                : 'Masukkan informasi produk baru.'}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup modal"
                        className="min-w-[44px] min-h-[44px] -mr-2 -mt-2 flex items-center justify-center rounded-lg text-[#5B6270] hover:text-[#212121] hover:bg-gray-100 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AA5B]"
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
                </div>

                {isEdit && (
                    <span className="inline-block text-xs font-semibold text-[#007A3D] bg-[#EBFBF1] px-2 py-0.5 rounded-md mt-3">
                        ID: {product.id}
                    </span>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
                    {error && (
                        <p
                            role="alert"
                            className="text-sm font-medium text-[#B81436] bg-[#FFF0F3] border border-[#FACDD7] rounded-lg px-3 py-2"
                        >
                            {error}
                        </p>
                    )}

                    <div>
                        <label
                            htmlFor="product-name"
                            className="block text-sm font-semibold text-[#212121] mb-1.5"
                        >
                            Nama Produk
                        </label>
                        <input
                            ref={nameInputRef}
                            id="product-name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Contoh: Pulpen"
                            className="w-full min-h-[44px] px-3 py-2 bg-white border border-[#D1D5DB] rounded-lg text-sm text-[#212121] placeholder-[#5B6270] focus:outline-none focus:ring-2 focus:ring-[#00AA5B] focus:border-[#008040]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="product-price"
                            className="block text-sm font-semibold text-[#212121] mb-1.5"
                        >
                            Harga (Rp)
                        </label>
                        <input
                            id="product-price"
                            type="number"
                            min="1"
                            step="1"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Contoh: 5000"
                            className="w-full min-h-[44px] px-3 py-2 bg-white border border-[#D1D5DB] rounded-lg text-sm text-[#212121] placeholder-[#5B6270] focus:outline-none focus:ring-2 focus:ring-[#00AA5B] focus:border-[#008040]"
                        />
                        <p className="text-xs text-[#5B6270] mt-1.5">
                            Harga harus lebih dari 0.
                        </p>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="min-h-[44px] px-4 py-2 text-sm font-semibold text-[#212121] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F8FAFC] transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AA5B]"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-[#008040] hover:bg-[#006B35] rounded-lg transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AA5B]"
                        >
                            {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductModal;
