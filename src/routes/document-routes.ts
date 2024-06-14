import { Router } from "express";
import upload from "../middleware/upload-middleware";
import { pfiDocuments } from "../controllers/document-controller";

const documentRouter = Router();

documentRouter.post("/upload-file", upload.array("files", 10), pfiDocuments);

export default documentRouter;