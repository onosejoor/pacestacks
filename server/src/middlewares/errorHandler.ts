import { ErrorRequestHandler } from "express";
import logger from "../configs/logger";
import { getErrorMessage } from "@/utils/utils";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.info(err.stack);

  res
    .status(Number(err.code) || 500)
    .json({ success: false, message: getErrorMessage(err) });

  next();
};

export default errorHandler;
