declare global {
  type Role = "admin" | "staff";

  type APIRes<T = any> = {
    success: boolean;
    message: string;
    data?: T;
  };

  type UserData = {
    email: string;
    created_at: Date;
    name: string;
  };

  type UserRes = APIRes<UserData>;

  type IDocument = {
    _id: string;
    fileName: string;
    originalName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    uploadedBy: UserData | string;
    createdAt: string;
    updatedAt: string;
  };

  type IProduct = {
    _id: string;
    name: string;
    sku: string;
    quantity: number;
    buyPrice: number;
    sellPrice: number;
    lowStockThreshold: number;
    createdAt: string;
    updatedAt: string;
  };
}

export {};
