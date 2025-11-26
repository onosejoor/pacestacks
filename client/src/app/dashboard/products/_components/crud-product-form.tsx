"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  createProduct,
  mutateProduct,
  updateProduct,
} from "@/actions/product.action";
import { ProductSchema } from "@/lib/configs/schema.config";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pen, Plus } from "lucide-react";

interface CrudProductFormProps {
  product?: IProduct;
}

const initialFormData = (product?: ProductSchema) => {
  return product
    ? { ...product }
    : {
        name: "",
        sku: "",
        quantity: 0,
        buyPrice: 0,
        sellPrice: 0,
        lowStockThreshold: 10,
      };
};

const textData = {
  edit: {
    cta: "Update Product",
    loading: "Updating...",
    title: "Update Product",
    icon: Pen,
    action: updateProduct,
  },
  create: {
    icon: Plus,
    title: "Create Product",
    cta: "Create Product",
    loading: "Creating...",
    action: createProduct,
  },
};

export default function Crud({ product }: CrudProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductSchema>(
    initialFormData(product)
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isEditing = !!product ? "edit" : "create";

  const text = textData[isEditing];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { success, message } = await text.action(formData, product?._id);

      const options = success ? "success" : "error";

      toast[options](message);
      if (success) {
        mutateProduct();
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <text.icon className="h-4 w-4" />
          {text.cta}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{text.title}</DialogTitle>
        </DialogHeader>
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Wireless Mouse"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. WM-001"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                  <Input
                    id="lowStockThreshold"
                    name="lowStockThreshold"
                    type="number"
                    min="0"
                    value={formData.lowStockThreshold}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyPrice">Buy Price ($)</Label>
                  <Input
                    id="buyPrice"
                    name="buyPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.buyPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellPrice">Sell Price ($)</Label>
                  <Input
                    id="sellPrice"
                    name="sellPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.sellPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? text.loading : text.cta}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
