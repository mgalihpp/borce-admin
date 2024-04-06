import { getCollections } from "@/server/actions/collections";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const { collections } = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {collections.map((collection) => (
            <Link href={`/collections/${collection._id}`} key={collection._id} className="hover:scale-105 transition-all duration-300 ease-in-out">
              <Image
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
                className="rounded-lg cursor-pointer max-w-[350px] max-h-[200px] object-cover"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
