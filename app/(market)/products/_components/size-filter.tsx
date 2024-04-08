import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getAllProductsSize } from "@/server/actions/product";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface FilterSizeProps {
  applyArrayFilter: ({
    category,
    value,
  }: {
    category: "colors" | "sizes";
    value: string;
  }) => void;
  filter: FilterProps;
}

const FilterSize: React.FC<FilterSizeProps> = ({
  applyArrayFilter,
  filter,
}) => {
  const { data: sizes, isLoading } = useQuery({
    queryKey: ["filter-size"],
    queryFn: async () => {
      const { sizes } = await getAllProductsSize();

      return sizes;
    },
  });

  return (
    <Accordion type="multiple">
      <AccordionItem value="size">
        <AccordionTrigger className="hover:no-underline">
          Sizes
        </AccordionTrigger>
        <AccordionContent className="pt-6">
          {isLoading ? (
            <FilterSizeSkeleton />
          ) : !sizes || sizes.length === 0 ? (
            <p className="text-xs text-grey-3">No sizes found.</p>
          ) : (
            <ul className="space-y-4">
              {sizes.map((size: string | undefined | null, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`size-${index}`}
                    className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={() => {
                      applyArrayFilter({
                        category: "sizes",
                        value: size as string,
                      });
                    }}
                    checked={filter.sizes.includes(size as string)}
                  />

                  <label
                    htmlFor={`size-${index}`}
                    className={cn("ml-3 text-sm uppercase text-gray-600", {
                      "font-medium text-gray-900": filter.sizes.includes(
                        size as string,
                      ),
                    })}
                  >
                    {size}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const FilterSizeSkeleton = () => {
  return Array.from({ length: 4 }, (_, index) => (
    <Skeleton className="mb-4 h-5 w-full" key={index} />
  ));
};

export default FilterSize;
