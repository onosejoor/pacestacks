"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/utils";
import { deleteProduct } from "@/actions/product.action";
import { deleteDocument } from "@/actions/document.action";

interface DeleteDataDialogProps {
  type: "product" | "document";
  id?: string;
  redirectUrl?: string;
}

const deleteObj = {
  product: {
    title: "Delete Product",
    description:
      "Are you sure you want to delete this product? This action cannot be undone.",
    action: deleteProduct,
  },
  document: {
    title: "Delete Document",
    description:
      "Are you sure you want to delete this document? This action cannot be undone.",
    action: deleteDocument,
  },
};

export default function DeleteDataDialog({
  id,
  type,
  redirectUrl,
}: DeleteDataDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const text = deleteObj[type];

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { success, message } = await text.action(id);
      const options = success ? "success" : "error";
      toast[options](message);
      if (success) {
        setOpen(false);
        router.push(redirectUrl!);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{text.title}</DialogTitle>
          <DialogDescription>{text.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
