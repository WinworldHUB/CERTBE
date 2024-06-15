"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_controller_1 = require("../controllers/document-controller");
const documentRouter = (0, express_1.Router)();
documentRouter.get("/get-docs/:agreementId", document_controller_1.getDocbyAgreementId);
documentRouter.post("/upload-file/:agreementId", document_controller_1.pfiDocuments);
exports.default = documentRouter;
