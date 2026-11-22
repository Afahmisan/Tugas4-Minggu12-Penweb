import { formatPrice } from './utils/formatPrice';

function ProductCard({ product, onEdit, onDelete }) {
    return (
        <article className="bg-white border border-[#E5E7E9] hover:border-[#00AA5B] rounded-xl p-5 shadow-xs transition-colors flex flex-col justify-between">
            <div>
                <span className="inline-block text-xs font-semibold text-[#007A3D] bg-[#EBFBF1] px-2 py-0.5 rounded-md">
                    ID: {product.id}
                </span>
                <h2 className="text-lg font-bold text-[#212121] mt-2.5 break-words">
                    {product.name}
                </h2>
                <p className="text-lg font-extrabold text-[#008040] mt-1 tabular-nums">
                    {formatPrice(product.price)}
                </p>
            </div>

            <div className="mt-4 pt-4 border-t border-[#F0F3F7] grid grid-cols-2 gap-2.5">
                <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="min-h-[44px] px-3 py-2 text-sm font-semibold text-[#008040] bg-white border border-[#008040] rounded-lg hover:bg-[#EBFBF1] transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AA5B]"
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => onDelete(product)}
                    className="min-h-[44px] px-3 py-2 text-sm font-semibold text-[#D91B42] bg-white border border-[#D91B42] rounded-lg hover:bg-[#FFF0F3] transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91B42]"
                >
                    Hapus
                </button>
            </div>
        </article>
    );
}

export default ProductCard;
