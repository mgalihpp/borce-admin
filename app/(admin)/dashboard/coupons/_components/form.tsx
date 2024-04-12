"use client";

import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { unstable_noStore as noStore } from "next/cache";
import Delete from "@/components/admin/delete-item";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  code: z.string().min(20).max(20),
  description: z.string().min(2).max(5000).trim(),
  isLimit: z.string(),
  limit: z.coerce.number().int().min(1).optional(),
});

interface CollectionFormProps {
  initialData?: CouponType | null; //Must have "?" to make it optional
}

function generateRandomCode(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  noStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          isLimit: (initialData.isLimit ? "true" : "false") as string,
        }
      : {
          code: "",
          description: "",
          isLimit: "false",
          limit: 0,
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const { mutate: createCoupon } = useMutation({
    mutationKey: ["create-coupon"],
    mutationFn: async (data: Omit<CouponType, "_id" | "listUser">) => {
      const res = await axiosInstance.post(
        initialData ? `/api/coupons/${initialData._id}` : "/api/coupons",
        data,
      );

      return res.data;
    },
  });

  // Function to handle button click and update the input field
  const handleGenerateCode = () => {
    const code = generateRandomCode(20);
    form.setValue("code", code); // Update the form input value
    toast.success("Code Generated!", {
      icon: "✅",
    });
  };

  const handleSubmit = (input: z.infer<typeof formSchema>) => {
    const isLimit = (input.isLimit === "true" ? true : false) as boolean;

    createCoupon(
      {
        ...input,
        isLimit: isLimit,
      },
      {
        onSuccess: () => {
          toast.success(`Coupon ${initialData ? "updated" : "created"}`);
          queryClient.invalidateQueries({
            queryKey: ["coupons"],
          });
          queryClient.invalidateQueries({
            queryKey: ["single-coupon", initialData?._id],
          });
          router.push("/dashboard/coupons");
        },
      },
    );
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Coupon</p>
          <Delete item="collections" id={initialData._id} />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Coupon</p>
      )}
      <Separator className="mb-7 mt-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <div className="flex flex-row items-center gap-2 max-sm:flex-col">
                    <Input
                      placeholder="Code"
                      readOnly
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                    <Button type="button" onClick={handleGenerateCode}>
                      Generate code
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <div className="flex gap-2 max-sm:flex-col">
            <FormField
              control={form.control}
              name="isLimit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Is Limit ?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select is this coupon limited ? " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Code Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      disabled={form.getValues("isLimit") === "false"}
                      placeholder="Code limit"
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              {initialData ? "Save" : "Submit"}
            </Button>
            <Button
              type="button"
              className="bg-blue-1 text-white"
              onClick={() => router.push("/dashboard/collections")}
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
