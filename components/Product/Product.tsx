import Link from "next/link";

export default function Product({ product }: any) {
  return (
    <div className="rounded-xl block bg-white dark:bg-zinc-800 hover:shadow-lg transition-colors font-[fontd1]">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="rounded-xl w-full"
        />
      </Link>
      <Link href={`/products/${product.slug}`} className="min-h-20 block">
        <h2 className="text-center line-clamp-2">{product.title}</h2>
      </Link>
      <div className="flex products-center justify-center pb-4 h-14">
        {product.count > 0 ? (
          <span>{`${product.price.toLocaleString()} تومان `}</span>
        ) : (
          <span className="text-red-500 text-sm bg-red-400/20 p-1.5 rounded-xl inline-block">
            ناموجود
          </span>
        )}
      </div>
    </div>
  );
}
