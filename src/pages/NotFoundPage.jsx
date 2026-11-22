import { Link, useLocation } from 'react-router-dom';

function NotFoundPage() {
    const location = useLocation();

    return (
        <section className="not-found-card" aria-labelledby="not-found-title">
            <span className="not-found-code">404</span>
            <h1 id="not-found-title" className="not-found-title">
                Halaman Tidak Ditemukan
            </h1>
            <p className="not-found-desc">
                Maaf, halaman yang Anda cari tidak tersedia atau alamat URL salah.
            </p>
            <p className="not-found-path">{location.pathname}</p>

            <div className="not-found-actions">
                <Link to="/products" className="btn btn-primary">
                    Kembali ke Daftar Produk
                </Link>
                <Link to="/dashboard" className="btn btn-neutral">
                    Ke Dashboard
                </Link>
            </div>
        </section>
    );
}

export default NotFoundPage;
