import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getAllProductsCategory } from "@/server/actions/product";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface FilterCategoryProps {
  setFilter: React.Dispatch<React.SetStateAction<FilterProps>>;
  filter: FilterProps;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  setFilter,
  filter,
}) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["filter-category"],
    queryFn: async () => {
      const { categories } = await getAllProductsCategory();

      return categories;
    },
  });

  return (
    <Accordion type="multiple">
      <AccordionItem value="category">
        <AccordionTrigger className="hover:no-underline">
          Categories
        </AccordionTrigger>
        <AccordionContent className="pt-6">
          {isLoading ? (
            <FilterCategorySkeleton />
          ) : !categories || categories.length === 0 ? (
            <p className="text-xs text-grey-3">No categories found.</p>
          ) : (
            <ul className="space-y-4">
              <li key={"all"}>
                <button
                  className={cn(
                    "disabled:cursor-not-allowed disabled:opacity-60",
                    {
                      "text-gray-900": filter.category === "",
                      "text-grey-3 hover:text-gray-900 hover:text-opacity-75":
                        filter.category !== "",
                    },
                  )}
                  onClick={() => {
                    setFilter((prev) => ({
                      ...prev,
                      category: "",
                    }));
                  }}
                >
                  All
                </button>
              </li>
              {categories.map((category: string | undefined | null) => (
                <li key={category}>
                  <button
                    className={cn(
                      "disabled:cursor-not-allowed disabled:opacity-60",
                      {
                        "text-gray-900": filter.category === category,
                        "text-grey-3 hover:text-gray-900 hover:text-opacity-75":
                          filter.category !== category,
                      },
                    )}
                    onClick={() => {
                      setFilter((prev) => ({
                        ...prev,
                        category: category as string,
                      }));
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const FilterCategorySkeleton = () => {
  return Array.from({ length: 4 }, (_, index) => (
    <Skeleton className="mb-4 h-5 w-full" key={index} />
  ));
};

export default FilterCategory;
