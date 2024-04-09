import NextImage from "@/components/next-image";
import Collections from "./_components/collections";
import ProductList from "./_components/product-list";
export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <>
      <NextImage
        src="/banner.png"
        alt="banner"
        width={2000}
        height={1000}
        className="w-screen rounded-lg"
        quality={100}
      />
      <Collections />
      <ProductList />
    </>
  );
}
