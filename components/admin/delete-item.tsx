import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface DeleteItemProps {
  item: "products" | "collections";
  id: string;
}

const Delete: React.FC<DeleteItemProps> = ({ item, id }) => {
  const queryClient = useQueryClient();
  const itemType = item === "products" ? "products" : "collections";

  const { mutate: deleteItem, isPending } = useMutation({
    mutationKey: ["delete"],
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/api/${itemType}/${id}`);

      if (res.status !== 400) {
        toast.success(`${item} deleted`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [itemType],
      });
      redirect(`/dashboard/${itemType}`);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will be permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteItem()}
            disabled={isPending}
            className="bg-red-1 text-white hover:bg-red-1/75"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
