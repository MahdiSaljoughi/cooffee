import Product from "@/components/Product/Product";
import { IProduct } from "@/types/interfaces";

export default async function ProducstPage() {
  const responseProduct = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`,
    {
      cache: "no-store",
    }
  );
  const dataProduct = await responseProduct.json();
  const products: IProduct[] = dataProduct.products;

  return (
    <>
      <div className="w-full">
        <div className="contain">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xs:gap-3 sm:gap-6 md:gap-10">
            {products.map((product: IProduct, index: number) => (
              <div key={index} className="w-full">
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
