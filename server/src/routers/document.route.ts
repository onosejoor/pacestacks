import { Router } from "express";
import * as documentController from "@/controllers/document.controller";
import { authenticate, requireAdmin } from "@/middlewares/auth.middleware";

const documentRouter = Router();

// All document routes require authentication
documentRouter.use(authenticate);

/**
 * POST /documents/upload
 * Upload a new document
 * Accessible by: staff, admin
 */
documentRouter.post(
  "/upload",
  documentController.upload.single("file"),
  documentController.uploadDocumentController
);

/**
 * GET /documents
 * Get all documents with optional filtering and pagination
 * Query params: userId, page, limit
 * Accessible by: staff, admin
 */
documentRouter.get("/", documentController.getAllDocumentsController);

/**
 * GET /documents/:id/download
 * Download/preview a document
 * Accessible by: staff, admin
 */
documentRouter.get(
  "/:id/download",
  documentController.downloadDocumentController
);

/**
 * GET /documents/:id
 * Get a single document by ID
 * Accessible by: staff, admin
 */
documentRouter.get("/:id", documentController.getDocumentByIdController);

/**
 * DELETE /documents/:id
 * Delete a document by ID
 * Accessible by: document owner
 */
documentRouter.delete(
  "/:id",
  // I'll uncomment this middleware if we want only admin to delete docs (not specified in the google doc sent)
  // requireAdmin,
  documentController.deleteDocumentController
);

export default documentRouter;
