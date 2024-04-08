import NextImage from "@/components/next-image";
import Collections from "./_components/collections";
import ProductList from "./_components/product-list";

export default function Page() {
  return (
    <>
      <NextImage
        src="/banner.png"
        alt="banner"
        width={2000}
        height={1000}
        className="rounded-lg w-screen"
        quality={100}
      />
      <Collections />
      <ProductList />
    </>
  );
}
