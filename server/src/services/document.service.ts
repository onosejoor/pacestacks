import Document from "@/models/document.model";
import { Role, ServiceRes } from "@/types/globals";
import mongoose from "mongoose";
import fs from "fs/promises";
import logger from "@/configs/logger";
import { AppError } from "@/configs/app-error";

interface UploadDocumentDTO {
  fileName: string;
  originalName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
  uploadedBy: string;
}

interface DocumentFilters {
  userId?: string;
  page?: number;
  limit?: number;
}

/**
 * Upload a new document
 */
export async function uploadDocument(
  documentData: UploadDocumentDTO
): Promise<ServiceRes> {
  const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedMimeTypes.includes(documentData.mimeType)) {
    throw new AppError("Only PDF and DOCX files are allowed", 400);
  }

  const maxSize = 10 * 1024 * 1024;
  if (documentData.fileSize > maxSize) {
    throw new AppError("File size exceeds 10MB limit", 400);
  }

  const document = await Document.create(documentData);

  return {
    success: true,
    message: "Document uploaded successfully",
    data: {
      id: document._id,
    },
  };
}

/**
 * Get all documents with optional filtering and pagination
 */
export async function getAllDocuments(
  filters: DocumentFilters = {}
): Promise<ServiceRes> {
  const { userId, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const query: any = {};
  if (userId) {
    query.uploadedBy = userId;
  }

  const [documents, total] = await Promise.all([
    Document.find(query)
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Document.countDocuments(query),
  ]);

  return {
    success: true,
    message: "Documents retrieved successfully",
    data: {
      documents,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  };
}

/**
 * Get a single document by ID
 */
export async function getDocumentById(
  documentId: string,
  role: Role
): Promise<ServiceRes> {
  const document = await Document.findById(documentId)
    .populate("uploadedBy", "username email")
    .lean();

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  return {
    success: true,
    message: "Document retrieved successfully",
    data: { ...document, role },
  };
}

/**
 * Delete a document by ID
 */
export async function deleteDocument(
  documentId: string,
  userId: string,
  role: Role
): Promise<ServiceRes> {
  const document = await Document.findById(documentId);

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  if (document.uploadedBy.toString() !== userId && role !== "admin") {
    throw new AppError("You are not authorized to delete this document", 403);
  }

  try {
    await fs.unlink(document.filePath);
  } catch (error) {
    logger.error(`Error deleting file: ${error}`);
  }

  await Document.findByIdAndDelete(documentId);

  return {
    success: true,
    message: "Document deleted successfully",
  };
}

/**
 * Get document file path for serving
 */
export async function getDocumentFilePath(
  documentId: string
): Promise<{ filePath: string; mimeType: string; fileName: string }> {
  const document = await Document.findById(documentId).lean();

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  // Check if file exists
  try {
    await fs.access(document.filePath);
  } catch (error) {
    throw new AppError("Document file not found on server", 404);
  }

  return {
    filePath: document.filePath,
    mimeType: document.mimeType,
    fileName: document.originalName,
  };
}
