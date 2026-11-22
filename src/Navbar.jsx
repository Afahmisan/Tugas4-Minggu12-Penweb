import { Link } from 'react-router-dom';

function Navbar({
    searchQuery,
    onSearchChange,
    onAddClick,
    totalProducts,
    viewMode = 'grid',
}) {
    return (
        <header className="products-header">
            <div className="products-header-inner">
                <div className="products-header-top">
                    <div className="products-brand">
                        <img
                            src="/favicon.svg"
                            alt=""
                            aria-hidden="true"
                            className="products-brand-logo"
                        />
                        <div>
                            <h1 className="products-title">Manajemen Produk</h1>
                            <p className="products-subtitle">
                                Kelola daftar produk dan harga dalam satu tempat.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onAddClick}
                        className="btn btn-primary"
                    >
                        + Tambah Produk
                    </button>
                </div>

                <div className="products-toolbar">
                    <div className="search-box">
                        <svg
                            aria-hidden="true"
                            className="search-icon"
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
                            className="search-input"
                        />

                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => onSearchChange('')}
                                aria-label="Hapus pencarian"
                                className="search-clear-btn"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="search-clear-icon"
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

                    <div className="toolbar-meta">
                        <Link to="/settings" className="mode-link-pill">
                            Tampilan: {viewMode === 'list' ? 'List' : 'Grid'}
                        </Link>
                        <span className="count-badge">{totalProducts} produk</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
