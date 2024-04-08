import ProductCard from "@/components/market/product/product-card";
import NextImage from "@/components/next-image";
import { getCollectionDetails } from "@/server/actions/collections";

export default async function CollectionPage({
  params,
}: {
  params: { collectionId: string };
}) {
  const { collection } = await getCollectionDetails(params.collectionId);

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <NextImage
        src={collection.image}
        width={1500}
        height={1000}
        alt="collection image"
        className="rounded-xl"
        quality={100}
      />
      <p className="text-heading3-bold text-grey-3">{collection.title}</p>
      <p className="text-sm font-normal text-grey-3 text-center max-w-[900px]">
        {collection.description}
      </p>

      <div className="flex flex-wrap gap-16 justify-center">
        {collection.products.length === 0 ? (
          <p className="text-sm text-grey-3">
            No products found.
          </p>
        ) : (
          collection.products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        )}
      </div>
    </div>
  );
}
