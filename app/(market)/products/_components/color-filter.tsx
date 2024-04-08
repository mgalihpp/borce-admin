import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getAllProductsColor } from "@/server/actions/product";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface FilterColorProps {
  applyArrayFilter: ({
    category,
    value,
  }: {
    category: "colors" | "sizes";
    value: string;
  }) => void;
  filter: FilterProps;
}

const FilterColor: React.FC<FilterColorProps> = ({
  applyArrayFilter,
  filter,
}) => {
  const { data: colors, isLoading } = useQuery({
    queryKey: ["filter-color"],
    queryFn: async () => {
      const { colors } = await getAllProductsColor();

      return colors;
    },
  });

  return (
    <Accordion type="multiple">
      <AccordionItem value="color">
        <AccordionTrigger className="hover:no-underline">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-6">
          {isLoading ? (
            <FilterColorSkeleton />
          ) : !colors || colors.length === 0 ? (
            <p className="text-xs text-grey-3">No colors found.</p>
          ) : (
            <ul className="space-y-4">
              {colors.map((color: string | undefined | null, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`color-${index}`}
                    className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={() => {
                      applyArrayFilter({
                        category: "colors",
                        value: color as string,
                      });
                    }}
                    checked={filter.colors.includes(color as string)}
                  />

                  <label
                    htmlFor={`color-${index}`}
                    className={cn("ml-3 text-sm capitalize text-gray-600", {
                      "font-medium text-gray-900": filter.colors.includes(
                        color as string,
                      ),
                    })}
                  >
                    {color}
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

const FilterColorSkeleton = () => {
  return Array.from({ length: 4 }, (_, index) => (
    <Skeleton className="mb-4 h-5 w-full" key={index} />
  ));
};

export default FilterColor;
