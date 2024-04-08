import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { PRICE_FILTERS } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";

interface FilterPriceProps {
  setFilter: React.Dispatch<React.SetStateAction<FilterProps>>;
  filter: FilterProps;
  minPrice: number;
  maxPrice: number;
  defaultPrice: [number, number];
}

const FilterPrice: React.FC<FilterPriceProps> = ({
  setFilter,
  filter,
  minPrice,
  maxPrice,
  defaultPrice,
}) => {
  return (
    <Accordion type="multiple">
      <AccordionItem value="price">
        <AccordionTrigger className="hover:no-underline">
          {PRICE_FILTERS.name}
        </AccordionTrigger>
        <AccordionContent className="pt-6">
          <ul className="space-y-4">
            {PRICE_FILTERS.option.map((price, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`price-${index}`}
                  className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={() => {
                    setFilter((prev) => ({
                      ...prev,
                      price: {
                        isCustom: false,
                        range: [...price.value],
                      },
                    }));
                  }}
                  checked={
                    !filter.price.isCustom &&
                    filter.price.range[0] === price.value[0] &&
                    filter.price.range[1] === price.value[1]
                  }
                />

                <label
                  htmlFor={`price-${index}`}
                  className={cn("ml-3 text-sm capitalize text-gray-600", {
                    "font-medium text-gray-900":
                      filter.price.range[0] === price.value[0] &&
                      filter.price.range[1] === price.value[1],
                  })}
                >
                  {price.label}
                </label>
              </li>
            ))}
            <li className="flex flex-col justify-center gap-1">
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`price-${PRICE_FILTERS.option.length}`}
                  className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={() => {
                    setFilter((prev) => ({
                      ...prev,
                      price: {
                        isCustom: true,
                        range: [0, 1000],
                      },
                    }));
                  }}
                  checked={filter.price.isCustom}
                />
                <label
                  htmlFor={`price-${PRICE_FILTERS.option.length}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  Custom
                </label>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Price</p>
                <div>
                  {filter.price.isCustom
                    ? minPrice.toFixed(0)
                    : filter.price.range[0].toFixed()}{" "}
                  $ -{" "}
                  {filter.price.isCustom
                    ? maxPrice.toFixed(0)
                    : filter.price.range[1].toFixed(0)}{" "}
                  ${" "}
                </div>
              </div>
              <Slider
                className={cn("", {
                  "opacity-50": !filter.price.isCustom,
                })}
                disabled={!filter.price.isCustom}
                onValueChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    price: {
                      isCustom: true,
                      range: value as never,
                    },
                  }));
                }}
                value={
                  filter.price.isCustom ? filter.price.range : defaultPrice
                }
                min={defaultPrice[0]}
                defaultValue={defaultPrice}
                max={defaultPrice[1]}
                step={5}
              />
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterPrice;
