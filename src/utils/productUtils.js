export function filterProducts(products, query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) =>
        product.name.toLowerCase().includes(normalized)
    );
}

// Returns { error } or { data: { name, price } } for positive integer prices.
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

// Require digits-only IDs so params like "1abc" or "1.5" do not match.
export function findProductById(products, rawId) {
    const text = String(rawId ?? '').trim();
    if (!/^\d+$/.test(text)) return null;

    const numericId = Number(text);
    return products.find((product) => product.id === numericId) ?? null;
}

export function summarizeProducts(products) {
    if (products.length === 0) {
        return { count: 0, totalValue: 0, minPrice: 0, maxPrice: 0 };
    }

    let totalValue = 0;
    let minPrice = products[0].price;
    let maxPrice = products[0].price;

    for (const product of products) {
        totalValue += product.price;
        if (product.price < minPrice) minPrice = product.price;
        if (product.price > maxPrice) maxPrice = product.price;
    }

    return { count: products.length, totalValue, minPrice, maxPrice };
}

export function normalizeViewMode(value) {
    return value === 'list' ? 'list' : 'grid';
}
