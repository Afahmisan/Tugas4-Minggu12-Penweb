import { Link } from 'react-router-dom';

const VIEW_OPTIONS = [
    {
        value: 'grid',
        title: 'Tampilan Grid',
        description:
            'Menampilkan produk sebagai kartu multi-kolom (1 kolom di ponsel, 2 kolom di tablet, 3 kolom di desktop).',
    },
    {
        value: 'list',
        title: 'Tampilan List',
        description:
            'Menampilkan produk dalam daftar baris memanjang agar nama, harga, dan tombol aksi mudah dipindai berurutan.',
    },
];

function SettingsPage({ viewMode, onViewModeChange }) {
    return (
        <div>
            <header className="page-header">
                <div>
                    <h1 className="page-heading">Pengaturan Tampilan</h1>
                    <p className="page-lead">
                        Atur tata letak daftar produk antara mode Grid dan List.
                    </p>
                </div>
            </header>

            <section className="settings-card">
                <fieldset className="settings-fieldset">
                    <legend className="settings-legend">
                        Mode Tampilan Katalog Produk
                    </legend>
                    <p className="settings-hint">
                        Pilihan Anda langsung diterapkan pada halaman Produk.
                    </p>

                    <div className="option-grid">
                        {VIEW_OPTIONS.map((option) => {
                            const isActive = viewMode === option.value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => onViewModeChange(option.value)}
                                    className={
                                        isActive
                                            ? 'option-card option-card-active'
                                            : 'option-card'
                                    }
                                >
                                    <div className="option-header">
                                        <span className="option-title">
                                            {option.title}
                                        </span>
                                        <span
                                            className={
                                                isActive
                                                    ? 'option-status option-status-active'
                                                    : 'option-status'
                                            }
                                        >
                                            {isActive ? 'Aktif' : 'Pilih'}
                                        </span>
                                    </div>
                                    <p className="option-desc">{option.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </fieldset>

                <div className="settings-footer">
                    <p className="settings-current-text">
                        Mode aktif saat ini:{' '}
                        <strong>{viewMode === 'list' ? 'List' : 'Grid'}</strong>
                    </p>
                    <Link to="/products" className="btn btn-primary">
                        Lihat di Daftar Produk
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default SettingsPage;
