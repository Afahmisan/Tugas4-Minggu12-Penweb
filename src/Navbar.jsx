function Navbar({ searchQuery, onSearchChange, onAddClick, totalProducts }) {
    return (
        <header className="bg-white border-t-[3px] border-t-[#00AA5B] border-b border-b-[#E5E7E9]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
                {/* Baris 1: Judul & Tombol Tambah */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                        <img
                            src="/favicon.svg"
                            alt=""
                            aria-hidden="true"
                            className="w-10 h-10 shrink-0"
                        />
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-[#212121]">
                                Manajemen Produk
                            </h1>
                            <p className="text-sm text-[#5B6270] mt-0.5">
                                Kelola daftar produk dan harga dalam satu tempat.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onAddClick}
                        className="min-h-[44px] bg-[#008040] hover:bg-[#006B35] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AA5B]"
                    >
                        + Tambah Produk
                    </button>
                </div>

                {/* Baris 2: Search Bar & Total Produk */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="relative w-full max-w-sm">
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 text-[#5B6270] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                        </svg>

                        <input
                            type="text"
                            aria-label="Cari nama produk"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Cari nama produk..."
                            className="w-full min-h-[44px] pl-10 pr-10 py-2 bg-[#F8FAFC] border border-[#D1D5DB] rounded-lg text-sm text-[#212121] placeholder-[#5B6270] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00AA5B] focus:border-[#008040]"
                        />

                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => onSearchChange('')}
                                aria-label="Hapus pencarian"
                                className="absolute right-1 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md text-[#5B6270] hover:text-[#212121] hover:bg-gray-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00AA5B]"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4"
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
                        )}
                    </div>

                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#EBFBF1] text-[#007A3D] border border-[#BFEFD4] shrink-0">
                        {totalProducts} produk
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
