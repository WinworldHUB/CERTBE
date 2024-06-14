import { Router } from "express";
import upload from "../middleware/upload-middleware";
import { getDocbyAgreementId, pfiDocuments } from "../controllers/document-controller";

const documentRouter = Router();

documentRouter.get("/get-docs/:agreementId", getDocbyAgreementId);
documentRouter.post("/upload-file/:agreementId", upload.array("files", 10), pfiDocuments);

export default documentRouter;