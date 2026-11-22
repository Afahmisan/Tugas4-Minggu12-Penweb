import test from 'node:test';
import assert from 'node:assert/strict';
import {
    ApiError,
    createProduct,
    deleteProduct,
    fetchProductById,
    fetchProducts,
    updateProduct,
} from '../src/utils/productApi.js';

function createMockFetch(status, body) {
    const calls = [];
    const fetchImpl = async (url, options = {}) => {
        calls.push({ url, options });
        return {
            ok: status >= 200 && status < 300,
            status,
            json: async () => body,
        };
    };
    return { fetchImpl, calls };
}

test('fetchProducts fetches product list and wraps network failure into ApiError', async () => {
    const sample = [{ id: 1, name: 'Buku Tulis Campus', price: 18000 }];
    const { fetchImpl, calls } = createMockFetch(200, sample);

    const data = await fetchProducts({ baseUrl: '/api/', fetchImpl });
    assert.deepEqual(data, sample);
    assert.equal(calls[0].url, '/api/products');
    assert.equal(calls[0].options.method, 'GET');

    await assert.rejects(
        () =>
            fetchProducts({
                baseUrl: '/api',
                fetchImpl: async () => {
                    throw new TypeError('Failed to fetch');
                },
            }),
        (err) => err instanceof ApiError && err.status === 0
    );
});

test('fetchProductById validates numeric id and handles 200 and 404 responses', async () => {
    const item = { id: 2, name: 'Pulpen', price: 5000 };
    const { fetchImpl, calls } = createMockFetch(200, item);

    const result = await fetchProductById(' 2 ', { baseUrl: '/api', fetchImpl });
    assert.deepEqual(result, item);
    assert.equal(calls[0].url, '/api/products/2');

    const missing = createMockFetch(404, { message: 'Produk tidak ditemukan' });
    await assert.rejects(
        () => fetchProductById('999', { baseUrl: '/api', fetchImpl: missing.fetchImpl }),
        (err) =>
            err instanceof ApiError &&
            err.status === 404 &&
            err.message === 'Produk tidak ditemukan'
    );

    let called = false;
    await assert.rejects(
        () =>
            fetchProductById('abc', {
                baseUrl: '/api',
                fetchImpl: async () => {
                    called = true;
                    return { ok: true, status: 200, json: async () => ({}) };
                },
            }),
        (err) => err instanceof ApiError && err.status === 400
    );
    assert.equal(called, false);
});

test('createProduct sends POST JSON payload and surfaces 400 validation errors', async () => {
    const created = { id: 3, name: 'Map', price: 4500 };
    const { fetchImpl, calls } = createMockFetch(201, created);

    const res = await createProduct(
        { name: 'Map', price: 4500 },
        { baseUrl: '/api', fetchImpl }
    );
    assert.deepEqual(res, created);
    assert.equal(calls[0].url, '/api/products');
    assert.equal(calls[0].options.method, 'POST');
    assert.equal(calls[0].options.headers['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(calls[0].options.body), { name: 'Map', price: 4500 });

    const invalid = createMockFetch(400, { message: 'nama atau harga tidak ditemukan' });
    await assert.rejects(
        () =>
            createProduct(
                { name: '', price: 4500 },
                { baseUrl: '/api', fetchImpl: invalid.fetchImpl }
            ),
        (err) => err instanceof ApiError && err.status === 400
    );
});

test('updateProduct sends PUT JSON payload with id and handles 404', async () => {
    const updated = { id: 2, name: 'Pulpen Biru', price: 7500 };
    const { fetchImpl, calls } = createMockFetch(200, updated);

    const res = await updateProduct(
        2,
        { name: 'Pulpen Biru', price: 7500 },
        { baseUrl: '/api', fetchImpl }
    );
    assert.deepEqual(res, updated);
    assert.equal(calls[0].url, '/api/products/2');
    assert.equal(calls[0].options.method, 'PUT');
    assert.deepEqual(JSON.parse(calls[0].options.body), {
        id: 2,
        name: 'Pulpen Biru',
        price: 7500,
    });

    const missing = createMockFetch(404, { message: 'Produk tidak ditemukan' });
    await assert.rejects(
        () =>
            updateProduct(
                999,
                { name: 'X', price: 1000 },
                { baseUrl: '/api', fetchImpl: missing.fetchImpl }
            ),
        (err) => err instanceof ApiError && err.status === 404
    );
});

test('deleteProduct sends DELETE request to product endpoint', async () => {
    const { fetchImpl, calls } = createMockFetch(200, {
        message: 'Produk berhasil dihapus',
    });

    const res = await deleteProduct(2, { baseUrl: '/api', fetchImpl });
    assert.equal(res.message, 'Produk berhasil dihapus');
    assert.equal(calls[0].url, '/api/products/2');
    assert.equal(calls[0].options.method, 'DELETE');
});
