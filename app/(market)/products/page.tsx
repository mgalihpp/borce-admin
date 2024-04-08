"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SORT_OPTIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import FilterCategory from "./_components/category-filter";
import FilterColor from "./_components/color-filter";
import FilterSize from "./_components/size-filter";
import FilterPrice from "./_components/price-filter";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import ProductCard, {
  ProductCardSkeleton,
  ProductNotFound,
} from "@/components/market/product/product-card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const DEFAULT_CUSTOM_PRICE = [0, 1000] as [number, number];

export default function ProductFilterPage() {
  const [filter, setFilter] = useState<FilterProps>({
    sort: "none",
    category: "",
    colors: [],
    sizes: [],
    price: {
      isCustom: false,
      range: DEFAULT_CUSTOM_PRICE,
    },
  });

  console.log(filter);

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "price" | "sort" | "category">;
    value: string;
  }) => {
    const isFiltereApplied = filter[category].includes(value as never);

    if (isFiltereApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  };

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      const { data } = await axiosInstance.post<ProductType[]>(
        "/api/products/filter",
        filter,
      );

      return data;
    },
  });

  console.log(products);

  return (
    <div className="flex w-full flex-col px-10 py-16 max-sm:px-3">
      <div className="flex justify-between">
        <h1 className="text-heading2-bold">Products</h1>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 max-lg:hidden">
              Sort
              <ChevronDown className="-mr-1 ml-1 size-5 flex-shrink-0 text-grey-3 group-hover:text-grey-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.name}
                  className={cn(
                    "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100",
                    {
                      "bg-gray-100 text-gray-900": option.value === filter.sort,
                      "text-gray-500": option.value !== filter.sort,
                    },
                  )}
                  onClick={() => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: option.value,
                    }));
                  }}
                >
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger>
              <Filter className="size-4 cursor-pointer lg:hidden" />
            </SheetTrigger>
            <SheetContent className="overflow-auto">
              <div>
                <ul
                  className="space-y-4 border-b border-gray-200 
            pb-6 text-sm font-medium text-gray-900"
                >
                  <FilterCategory setFilter={setFilter} filter={filter} />
                </ul>

                <FilterColor
                  applyArrayFilter={applyArrayFilter}
                  filter={filter}
                />
                <FilterSize
                  applyArrayFilter={applyArrayFilter}
                  filter={filter}
                />
                <FilterPrice
                  setFilter={setFilter}
                  filter={filter}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  defaultPrice={DEFAULT_CUSTOM_PRICE}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator className="mb-6 mt-12" />

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* FILTERS */}

          <div className="hidden lg:block">
            <FilterCategory setFilter={setFilter} filter={filter} />
            <FilterColor applyArrayFilter={applyArrayFilter} filter={filter} />
            <FilterSize applyArrayFilter={applyArrayFilter} filter={filter} />
            <FilterPrice
              setFilter={setFilter}
              filter={filter}
              minPrice={minPrice}
              maxPrice={maxPrice}
              defaultPrice={DEFAULT_CUSTOM_PRICE}
            />
          </div>

          {/* PRODUCTS GRID */}

          {isLoading ? (
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3">
              <ProductCardSkeleton />
            </ul>
          ) : !products || products.length === 0 ? (
            <ul className="w-full mx-auto flex items-center justify-center lg:col-span-3">
              <ProductNotFound />
            </ul>
          ) : (
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3">
              {products?.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
