import { NavLink, Outlet } from 'react-router-dom';

function NavIcon({ kind, className }) {
    if (kind === 'dashboard') {
        return (
            <svg
                aria-hidden="true"
                className={className}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
                />
            </svg>
        );
    }

    if (kind === 'products') {
        return (
            <svg
                aria-hidden="true"
                className={className}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14l-1 12H6L5 8zm4-3a3 3 0 016 0v3H9V5z"
                />
            </svg>
        );
    }

    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 7h16M4 12h16M4 17h16M9 5v4m6 1v4m-4 1v4"
            />
        </svg>
    );
}

const NAV_ITEMS = [
    { to: '/dashboard', label: 'Dashboard', kind: 'dashboard' },
    { to: '/products', label: 'Produk', kind: 'products' },
    { to: '/settings', label: 'Settings', kind: 'settings' },
];

function Layout({ totalProducts, viewMode }) {
    const viewLabel = viewMode === 'list' ? 'List' : 'Grid';

    return (
        <div className="app-shell">
            <a href="#main-content" className="skip-link">
                Lewati ke konten utama
            </a>
            <aside className="sidebar" aria-label="Navigasi utama">
                <div className="sidebar-brand">
                    <img
                        src="/favicon.svg"
                        alt=""
                        aria-hidden="true"
                        className="sidebar-logo"
                    />
                    <div>
                        <p className="sidebar-title">Manajemen Produk</p>
                        <p className="sidebar-subtitle">Katalog & Pengaturan</p>
                    </div>
                </div>

                <nav className="sidebar-nav" aria-label="Menu samping">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                isActive
                                    ? 'sidebar-link sidebar-link-active'
                                    : 'sidebar-link'
                            }
                        >
                            <NavIcon kind={item.kind} className="nav-icon" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-stat-row">
                        <span className="sidebar-stat-label">Total Produk</span>
                        <span className="sidebar-stat-value">{totalProducts} item</span>
                    </div>
                    <div className="sidebar-stat-row">
                        <span className="sidebar-stat-label">Tampilan Katalog</span>
                        <span className="sidebar-stat-value">{viewLabel}</span>
                    </div>
                </div>
            </aside>

            <div className="app-content">
                <header className="mobile-topbar">
                    <div className="mobile-brand">
                        <img
                            src="/favicon.svg"
                            alt=""
                            aria-hidden="true"
                            className="mobile-brand-logo"
                        />
                        <span className="mobile-brand-title">Manajemen Produk</span>
                    </div>
                    <span className="count-badge">{totalProducts} produk</span>
                </header>

                <main id="main-content" className="page-container">
                    <Outlet />
                </main>
            </div>

            <nav className="mobile-bottom-nav" aria-label="Navigasi bawah">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            isActive
                                ? 'mobile-nav-link mobile-nav-link-active'
                                : 'mobile-nav-link'
                        }
                    >
                        <NavIcon kind={item.kind} className="mobile-nav-icon" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}

export default Layout;
