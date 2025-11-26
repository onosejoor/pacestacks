import mongoose, { Model } from "mongoose";

interface IDocument {
  fileName: string;
  originalName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
  uploadedBy: mongoose.Types.ObjectId;
}

const DocumentSchema = new mongoose.Schema<IDocument>(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
      enum: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    },
    fileSize: {
      type: Number,
      required: true,
      min: 0,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

DocumentSchema.index({ uploadedBy: 1, createdAt: -1 });

const Document: Model<IDocument> =
  mongoose.models.Document || mongoose.model("Document", DocumentSchema);

export default Document;
