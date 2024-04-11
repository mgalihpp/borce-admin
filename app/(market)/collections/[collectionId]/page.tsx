import ProductCard from "@/components/market/product/product-card";
import NextImage from "@/components/next-image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCollectionDetails } from "@/server/actions/collections";

export default async function CollectionPage({
  params,
}: {
  params: { collectionId: string };
}) {
  const { collection } = await getCollectionDetails(params.collectionId);

  return (
    <div className="flex flex-col items-center gap-8 px-10 py-5">
      <NextImage
        src={collection.image}
        width={1500}
        height={1000}
        alt="collection image"
        className="rounded-xl"
        quality={100}
      />
      <p className="text-heading3-bold text-grey-3">{collection.title}</p>
      {collection.description.length > 1000 ? (
        <Accordion type="multiple" className="max-w-xl max-sm:max-w-xs max-md:max-w-md">
          <AccordionItem value="description">
            <AccordionTrigger className="text-sm font-normal text-grey-3 hover:no-underline">
              <p className="max-w-xl max-sm:max-w-xs max-md:max-w-md overflow-hidden text-ellipsis whitespace-nowrap">
                {collection.description.slice(0, 200)}
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="whitespace-pre-wrap text-start text-sm font-normal text-grey-3">
                {collection.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <p className="whitespace-pre-wrap text-center text-sm font-normal text-grey-3">
          {collection.description}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-16">
        {collection.products.length === 0 ? (
          <p className="text-sm text-grey-3">No products found.</p>
        ) : (
          <ProductCard products={collection.products} />
        )}
      </div>
    </div>
  );
}
