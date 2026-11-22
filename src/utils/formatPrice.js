/** Format integer rupiah amount to "Rp5.000" display format. */
export function formatPrice(value) {
    return `Rp${new Intl.NumberFormat('id-ID').format(value)}`;
}
