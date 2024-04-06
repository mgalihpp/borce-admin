import Image from "next/image";
import Collections from "./_components/collections";
import ProductList from "./_components/product-list";

export default function Page() {
  return (
    <>
      <Image
        src="/banner.png"
        alt="banner"
        width={2000}
        height={1000}
        className="w-screen"
        loading="lazy"
        fetchPriority="auto"
      />
      <Collections />
      <ProductList />
    </>
  );
}
