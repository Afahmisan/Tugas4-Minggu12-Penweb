import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice } from '../src/utils/formatPrice.js';
import { filterProducts, validateProductInput } from '../src/utils/productUtils.js';

const SAMPLE_PRODUCTS = [
    { id: 1, name: 'Pulpen', price: 5000 },
    { id: 2, name: 'Buku Tulis', price: 12000 },
    { id: 3, name: 'Spidol', price: 8000 },
];

test('formatPrice formats Indonesian rupiah without space', () => {
    assert.equal(formatPrice(5000), 'Rp5.000');
    assert.equal(formatPrice(12000), 'Rp12.000');
});

test('filterProducts matches case-insensitively and handles whitespace', () => {
    assert.equal(filterProducts(SAMPLE_PRODUCTS, '').length, 3);
    assert.deepEqual(filterProducts(SAMPLE_PRODUCTS, ' buku '), [
        { id: 2, name: 'Buku Tulis', price: 12000 },
    ]);
    assert.deepEqual(filterProducts(SAMPLE_PRODUCTS, 'tidak-ada'), []);
});

test('validateProductInput rejects empty or non-positive values and trims valid input', () => {
    assert.equal(validateProductInput('   ', '5000').error, 'Nama produk wajib diisi.');
    assert.equal(validateProductInput('Pulpen', '').error, 'Harga produk wajib diisi.');
    assert.equal(validateProductInput('Pulpen', '0').error, 'Harga harus lebih dari 0.');
    assert.equal(validateProductInput('Pulpen', '-500').error, 'Harga harus lebih dari 0.');
    assert.equal(validateProductInput('Pulpen', '10.5').error, 'Harga harus berupa angka bulat.');
    assert.deepEqual(validateProductInput('  Penghapus  ', '3000'), {
        data: { name: 'Penghapus', price: 3000 },
    });
});
