"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_controller_1 = require("../controllers/document-controller");
const upload_middleware_1 = __importDefault(require("../middleware/upload-middleware"));
const documentRouter = (0, express_1.Router)();
documentRouter.get("/get-docs/:agreementId", document_controller_1.getDocbyAgreementId);
documentRouter.post("/upload-file/:agreementId", upload_middleware_1.default.array("files", 4), document_controller_1.pfiDocuments);
exports.default = documentRouter;
