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
import { useEffect, useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllProductsCategory,
  getAllProductsColor,
  getAllProductsSize,
} from "@/server/actions/product";

const DEFAULT_CUSTOM_PRICE = [0, 1000] as [number, number];

export default function ProductFilterPage() {
  const router = useRouter();

  const pageParams = useSearchParams().get("page");
  const sortParams = useSearchParams().get("sort") as SortType | null;
  const colorsParams = useSearchParams().getAll("colors");
  const sizesParams = useSearchParams().getAll("sizes");

  const [pages, setPages] = useState<number>(Number(pageParams ?? 1));
  const [filter, setFilter] = useState<FilterProps>({
    sort: sortParams ?? "none",
    category: "",
    colors: colorsParams,
    sizes: sizesParams,
    price: {
      isCustom: false,
      range: DEFAULT_CUSTOM_PRICE,
    },
    page: pages,
    pageSize: 12,
  });

  console.log(filter);

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<
      typeof filter,
      "price" | "sort" | "category" | "page" | "pageSize"
    >;
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

  const { data: categories, isLoading: catergoryLoading } = useQuery({
    queryKey: ["filter-category"],
    queryFn: async () => {
      const { categories } = await getAllProductsCategory();

      return categories;
    },
  });

  const { data: colors, isLoading: colorLoading } = useQuery({
    queryKey: ["filter-color"],
    queryFn: async () => {
      const { colors } = await getAllProductsColor();

      return colors;
    },
  });

  const { data: sizes, isLoading: sizeLoading } = useQuery({
    queryKey: ["filter-size"],
    queryFn: async () => {
      const { sizes } = await getAllProductsSize();

      return sizes;
    },
  });

  // Function to generate search params string
  function generateSearchParams(filter: FilterProps): string {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(`${key}[]`, item.toString()));
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) =>
          params.append(`${key}.${subKey}`, subValue.toString()),
        );
      } else {
        params.set(key, value.toString());
      }
    });
    return params.toString();
  }

  useEffect(() => {
    if (categories && colors && sizes) {
      const searchParams = generateSearchParams(filter);
      console.log(searchParams);
      router.push(`${window.location.pathname}?${searchParams}`, {
        scroll: false
      });
    }
  }, [categories, colors, sizes, filter, router]);

  const isNextDisabled = products && products.length < 12;
  const isPrevDisabled = pages === 1;

  const handleNextPage = () => {
    const nextPage = pages + 1;
    const params = new URLSearchParams(window.location.search);
    params.set("page", nextPage.toString()); // Convert nextPage to string
    router.push(`${window.location.pathname}?${params.toString()}`);

    setFilter((prev) => ({
      ...prev,
      page: nextPage,
    }));
    setPages(nextPage);
  };

  const handlePreviousPage = () => {
    const prevPage = pages > 1 ? pages - 1 : 1; // Ensure prevPage is always greater than or equal to 1
    const params = new URLSearchParams(window.location.search);
    params.set("page", prevPage.toString()); // Convert prevPage to string
    router.push(`${window.location.pathname}?${params.toString()}`);

    setFilter((prev) => ({
      ...prev,
      page: prevPage,
    }));
    setPages(prevPage);
  };

  return (
    <div className="flex w-full flex-col px-10 py-16 max-sm:px-3">
      <div className="flex justify-between">
        <h1 className="text-heading2-bold">Products</h1>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex items-center justify-center text-sm font-medium text-gray-700">
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
              <div className="mt-4">
                <FilterCategory
                  setFilter={setFilter}
                  filter={filter}
                  isLoading={catergoryLoading}
                  categories={categories}
                />

                <FilterColor
                  applyArrayFilter={applyArrayFilter}
                  filter={filter}
                  isLoading={colorLoading}
                  colors={colors}
                />
                <FilterSize
                  applyArrayFilter={applyArrayFilter}
                  filter={filter}
                  isLoading={sizeLoading}
                  sizes={sizes}
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
            <FilterCategory
              setFilter={setFilter}
              filter={filter}
              isLoading={catergoryLoading}
              categories={categories}
            />
            <FilterColor
              applyArrayFilter={applyArrayFilter}
              filter={filter}
              isLoading={colorLoading}
              colors={colors}
            />
            <FilterSize
              applyArrayFilter={applyArrayFilter}
              filter={filter}
              isLoading={sizeLoading}
              sizes={sizes}
            />
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
            <ul className="mx-auto flex w-full items-center justify-center lg:col-span-3">
              <ProductNotFound />
            </ul>
          ) : (
            <ProductCard
              className="h-max lg:col-span-3"
              center
              products={products}
              corousel={false}
            />
          )}
        </div>
        {/* PAGINATION */}

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div></div>
          <Pagination className="lg:col-span-3">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePreviousPage}
                  disabled={isPrevDisabled}
                />
              </PaginationItem>
              <PaginationItem>
                <Button variant="ghost">{pages}</Button>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={handleNextPage}
                  disabled={isNextDisabled}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  );
}
