import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
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
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface DeleteItemProps {
  item: "products" | "collections";
  id: string;
}

const Delete: React.FC<DeleteItemProps> = ({ item, id }) => {
  const { mutate: deleteItem } = useMutation({
    mutationKey: ["delete"],
    mutationFn: async () => {
      const itemType = item === "products" ? "products" : "collections";

      const res = await axiosInstance.delete(`/api/${itemType}/${id}`);

      if (res.status !== 400) {
        toast.success(`${item} deleted`);
        redirect(`/${itemType}`);
      }
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-1 text-white">
          <Trash className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
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
            className="bg-red-1 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
