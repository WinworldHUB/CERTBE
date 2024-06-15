import { Router } from "express";
import { getDocbyAgreementId, pfiDocuments } from "../controllers/document-controller";

const documentRouter = Router();

documentRouter.get("/get-docs/:agreementId", getDocbyAgreementId);
documentRouter.post("/upload-file/:agreementId", pfiDocuments);

export default documentRouter;