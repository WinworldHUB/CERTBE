"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pfiDocuments = exports.getDocbyAgreementId = void 0;
const setup_1 = require("../db/setup");
const drizzle_orm_1 = require("drizzle-orm");
const upload_1 = __importDefault(require("../utils/upload"));
const documents_1 = __importDefault(require("../db/schema/documents"));
const getDocbyAgreementId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { agreementId } = req.params;
    if (!agreementId) {
        res.status(400).json({ error: "PFI ID is required" });
        return;
    }
    const parsedAgreementId = parseInt(agreementId);
    const fetchedDocs = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select().from(documents_1.default).where((0, drizzle_orm_1.eq)(documents_1.default.agreementId, parsedAgreementId)));
    res.status(200).json(fetchedDocs);
});
exports.getDocbyAgreementId = getDocbyAgreementId;
const pfiDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { agreementId } = req.params;
    if (!agreementId) {
        return res.status(400).json({ message: "Agreement ID is required" });
    }
    const files = req.files;
    if (!req.files || !Array.isArray(req.files)) {
        return res
            .status(400)
            .json({
            message: "Invalid or no file(s) were given",
            allowedFiles: ".pdf, .docx, .doc, .txt",
        });
    }
    // Upload files to S3 and get the URLs
    try {
        const uploadPromises = files.map((file) => (0, upload_1.default)(file));
        const urls = yield Promise.all(uploadPromises);
        if (!urls || urls.length === 0) {
            return res.status(500).json({ message: "Failed to upload files" });
        }
        const parsedAgreementId = parseInt(agreementId);
        yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.insert(documents_1.default).values({
            name: files[0].originalname,
            url: urls[0],
            agreementId: parsedAgreementId,
        }));
        res.status(201).json({
            urls,
            message: "Files uploaded successfully",
        });
    }
    catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({ message: "Failed to upload files" });
    }
});
exports.pfiDocuments = pfiDocuments;
