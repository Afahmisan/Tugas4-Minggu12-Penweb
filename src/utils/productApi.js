const DEFAULT_API_BASE = (import.meta.env?.VITE_API_URL || '/api').replace(/\/+$/, '');

export class ApiError extends Error {
    constructor(message, status = 0) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

async function requestJson(
    path,
    options = {},
    { baseUrl = DEFAULT_API_BASE, fetchImpl = fetch } = {}
) {
    const cleanBase = baseUrl.replace(/\/+$/, '');
    let response;

    try {
        response = await fetchImpl(`${cleanBase}${path}`, options);
    } catch {
        throw new ApiError(
            'Gagal terhubung ke server backend ExpressJS. Pastikan server berjalan di http://localhost:3000.',
            0
        );
    }

    let data = null;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new ApiError(
            data?.message || `Permintaan gagal (HTTP ${response.status}).`,
            response.status
        );
    }

    return data;
}

export function fetchProducts(config) {
    return requestJson('/products', { method: 'GET' }, config);
}

// Reject non-numeric route params before hitting ExpressJS to avoid unnecessary 400 calls.
export function fetchProductById(rawId, config) {
    const text = String(rawId ?? '').trim();
    if (!/^\d+$/.test(text)) {
        return Promise.reject(
            new ApiError('ID produk harus berupa angka bulat positif.', 400)
        );
    }

    return requestJson(`/products/${text}`, { method: 'GET' }, config);
}

export function createProduct({ name, price }, config) {
    return requestJson(
        '/products',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price }),
        },
        config
    );
}

// Include id in JSON body so both PUT /products and PUT /products/:id handlers match.
export function updateProduct(id, { name, price }, config) {
    return requestJson(
        `/products/${id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, price }),
        },
        config
    );
}

export function deleteProduct(id, config) {
    return requestJson(`/products/${id}`, { method: 'DELETE' }, config);
}
