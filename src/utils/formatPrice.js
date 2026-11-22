// Format rupiah without a space ("Rp5.000") to match the catalog display contract.
export function formatPrice(value) {
    return `Rp${new Intl.NumberFormat('id-ID').format(value)}`;
}
