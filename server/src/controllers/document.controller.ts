import { Request, Response } from "express";
import * as documentService from "@/services/document.service";
import logger from "@/configs/logger";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { getErrorMessage } from "@/utils/utils";
import { AppError } from "@/configs/app-error";

// Extend Express Request type to include file
declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads", "documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const multerStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Only PDF and DOCX files are allowed", 400));
  }
};

export const upload = multer({
  storage: multerStorage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

/**
 * Upload a document
 * POST /documents/upload
 */
export async function uploadDocumentController(req: Request, res: Response) {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    if (!req.user) {
      // Clean up uploaded file if user is not authenticated
      fs.unlinkSync(req.file.path);
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const documentData = {
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedBy: req.user.id,
    };

    const result = await documentService.uploadDocument(documentData);

    res.status(201).json(result);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    logger.error(error, "Error uploading document");
    res.status(400).json({
      success: false,
      message: "Failed to upload document",
    });
  }
}

/**
 * Get all documents with optional filtering and pagination
 * GET /documents?userId=&page=1&limit=10
 */
export async function getAllDocumentsController(req: Request, res: Response) {
  try {
    const { userId, page, limit } = req.query;

    const filters = {
      userId: userId as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 10,
    };

    const result = await documentService.getAllDocuments(filters);

    res.status(200).json(result);
  } catch (error) {
    logger.error(error, "Error getting documents");
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
}

/**
 * Get a single document by ID
 * GET /documents/:id
 */
export async function getDocumentByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const result = await documentService.getDocumentById(id, req.user!.role);

    res.status(200).json(result);
  } catch (error) {
    logger.error(error, "Error getting document");
    const statusCode =
      error instanceof Error && error.message.includes("not found") ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
}

/**
 * Download/preview a document
 * GET /documents/:id/download
 */
export async function downloadDocumentController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { filePath, mimeType, fileName } =
      await documentService.getDocumentFilePath(id);

    // Set appropriate headers
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

    // Stream the file
    res.sendFile(filePath);
  } catch (error) {
    logger.error(error, "Error downloading document");
    const statusCode =
      error instanceof Error && error.message.includes("not found") ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
}

/**
 * Delete a document by ID
 * DELETE /documents/:id
 */
export async function deleteDocumentController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const result = await documentService.deleteDocument(
      id,
      req.user.id,
      req.user.role
    );

    res.status(200).json(result);
  } catch (error) {
    logger.error(error, "Error deleting document");
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
}
