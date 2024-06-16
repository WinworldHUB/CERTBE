import { Router } from "express";
import { getDocbyAgreementId, pfiDocuments } from "../controllers/document-controller";
import upload from "../middleware/upload-middleware";

const documentRouter = Router();

documentRouter.get("/get-docs/:agreementId", getDocbyAgreementId);
documentRouter.post("/upload-file/:agreementId", upload.array("files", 4) ,pfiDocuments);

export default documentRouter;