/** Filter products by case-insensitive substring match against product name. */
export function filterProducts(products, query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) =>
        product.name.toLowerCase().includes(normalized)
    );
}

/** Validate and parse product modal input; returns { error } or { data: { name, price } }. */
export function validateProductInput(name, rawPrice) {
    const trimmedName = name.trim();
    if (!trimmedName) {
        return { error: 'Nama produk wajib diisi.' };
    }

    const priceText = String(rawPrice).trim();
    if (priceText === '') {
        return { error: 'Harga produk wajib diisi.' };
    }

    const parsedPrice = Number(priceText);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
        return { error: 'Harga harus lebih dari 0.' };
    }

    if (!Number.isInteger(parsedPrice)) {
        return { error: 'Harga harus berupa angka bulat.' };
    }

    return { data: { name: trimmedName, price: parsedPrice } };
}
