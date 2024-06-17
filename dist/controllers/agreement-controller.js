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
exports.getAgreementDetails = exports.approveAgreementPayment = exports.rejectAgreement = exports.createAgreement = exports.approveAgreement = exports.getAgreementbyPfiId = exports.getAllAgreements = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const agreements_1 = __importDefault(require("../db/schema/agreements"));
const setup_1 = require("../db/setup");
const pfi_1 = __importDefault(require("../db/schema/pfi"));
const documents_1 = __importDefault(require("../db/schema/documents"));
const generateAgreementNumber_1 = __importDefault(require("../utils/generateAgreementNumber"));
const getAllAgreements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAgreements = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select({
            agreementId: agreements_1.default.id,
            pfiId: agreements_1.default.pfiId,
            orgName: pfi_1.default.name,
            status: agreements_1.default.status,
            orgAddress: pfi_1.default.address,
            agreementNumber: agreements_1.default.agreementNumber,
            agreementAmount: agreements_1.default.agreementAmount,
            commencementDate: agreements_1.default.commencementDate,
            expiryDate: agreements_1.default.expiryDate,
            period: agreements_1.default.agreementPeriod,
        }).from(agreements_1.default).leftJoin(pfi_1.default, (0, drizzle_orm_1.eq)(agreements_1.default.pfiId, pfi_1.default.id)).where((0, drizzle_orm_1.eq)(agreements_1.default.isActive, true)).groupBy(agreements_1.default.id, agreements_1.default.pfiId, pfi_1.default.name, agreements_1.default.status, pfi_1.default.address, agreements_1.default.agreementNumber, agreements_1.default.agreementAmount, agreements_1.default.commencementDate, agreements_1.default.expiryDate, agreements_1.default.agreementPeriod));
        if (fetchedAgreements.length === 0) {
            res.status(200).json({
                success: true,
                message: "No agreements found",
                agreements: [],
            });
            return;
        }
        res.status(200).json({
            success: true,
            agreements: fetchedAgreements !== null && fetchedAgreements !== void 0 ? fetchedAgreements : [],
            message: "Agreements fetched successfully",
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error, agreements: [] });
    }
});
exports.getAllAgreements = getAllAgreements;
const getAgreementbyPfiId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pfiId } = req.params;
    if (!pfiId) {
        res.status(400).json({ error: "PFI ID is required" });
        return;
    }
    const parsedPfiId = parseInt(pfiId);
    const fetchedAgreements = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select({
        agreementId: agreements_1.default.id,
        pfiId: agreements_1.default.pfiId,
        orgName: pfi_1.default.name,
        agreementNumber: agreements_1.default.agreementNumber,
        orgAddress: pfi_1.default.address,
        agreementAmount: agreements_1.default.agreementAmount,
        commencementDate: agreements_1.default.commencementDate,
        expiryDate: agreements_1.default.expiryDate,
        period: agreements_1.default.agreementPeriod,
    }).from(agreements_1.default).leftJoin(pfi_1.default, (0, drizzle_orm_1.eq)(agreements_1.default.pfiId, pfi_1.default.id)).where((0, drizzle_orm_1.eq)(agreements_1.default.pfiId, parsedPfiId)).groupBy(agreements_1.default.id, agreements_1.default.pfiId, pfi_1.default.name, agreements_1.default.agreementNumber, pfi_1.default.address, agreements_1.default.agreementAmount, agreements_1.default.commencementDate, agreements_1.default.expiryDate, agreements_1.default.agreementPeriod));
    if (fetchedAgreements.length === 0) {
        res
            .status(404)
            .json({ success: false, message: "No agreement found for this PFI" });
        return;
    }
    res.status(200).json({
        success: true,
        agreement: fetchedAgreements,
        documents: [],
    });
});
exports.getAgreementbyPfiId = getAgreementbyPfiId;
const approveAgreement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { agreementId } = req.params;
    if (!agreementId) {
        res.status(400).json({ error: "Agreement ID is required" });
        return;
    }
    const parsedAgreementId = parseInt(agreementId);
    const updatedAgreement = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.update(agreements_1.default).set({ isApproved: true }).where((0, drizzle_orm_1.eq)(agreements_1.default.id, parsedAgreementId)));
    res.status(200).json(updatedAgreement);
});
exports.approveAgreement = approveAgreement;
const createAgreement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pfiId, agreementAmount, agreementPeriod, commencementDate, expiryDate, } = req.body;
    if (!pfiId ||
        !agreementAmount ||
        !agreementPeriod ||
        !commencementDate ||
        !expiryDate) {
        console.log("Validation failed: Missing agreement data");
        return res.status(400).json({
            success: false,
            message: "Agreement data is required",
            agreement: {},
        });
    }
    try {
        console.log("Generating agreement number");
        const agreementNumber = (0, generateAgreementNumber_1.default)(new Date(commencementDate), pfiId);
        console.log("Inserting agreement into database");
        const newAgreement = yield setup_1.db
            .insert(agreements_1.default)
            .values({
            pfiId,
            agreementNumber,
            agreementAmount,
            agreementPeriod,
            commencementDate: new Date(commencementDate),
            expiryDate: new Date(expiryDate),
        })
            .returning({
            agreementId: agreements_1.default.id,
            pfiId: agreements_1.default.pfiId,
            agreementNumber: agreements_1.default.agreementNumber,
            agreementAmount: agreements_1.default.agreementAmount,
            commencementDate: agreements_1.default.commencementDate,
            expiryDate: agreements_1.default.expiryDate,
            period: agreements_1.default.agreementPeriod,
            agreementStatus: agreements_1.default.status,
        });
        if (!newAgreement) {
            console.log("Agreement creation failed");
            return res.status(400).json({
                success: false,
                message: "Agreement creation failed",
                agreement: {},
            });
        }
        console.log("Agreement created successfully");
        res.status(201).json({
            success: true,
            message: "Agreement created successfully",
            agreement: newAgreement[0],
        });
    }
    catch (error) {
        console.error("Error creating agreement:", error);
        res.status(500).json({ success: false, message: error, agreement: {} });
    }
});
exports.createAgreement = createAgreement;
const rejectAgreement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { agreementId } = req.params;
    if (!agreementId) {
        res.status(400).json({ error: "Agreement ID is required" });
        return;
    }
    const parsedAgreementId = parseInt(agreementId);
    const updatedAgreement = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.update(agreements_1.default).set({ isApproved: false }).where((0, drizzle_orm_1.eq)(agreements_1.default.id, parsedAgreementId)));
    res.status(200).json(updatedAgreement);
});
exports.rejectAgreement = rejectAgreement;
const approveAgreementPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { agreementId } = req.params;
    if (!agreementId) {
        res.status(400).json({ error: "Agreement ID is required" });
        return;
    }
    const parsedAgreementId = parseInt(agreementId);
    const updatedAgreement = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.update(agreements_1.default).set({ isPaid: true }).where((0, drizzle_orm_1.eq)(agreements_1.default.id, parsedAgreementId)));
    res.status(200).json(updatedAgreement);
});
exports.approveAgreementPayment = approveAgreementPayment;
const getAgreementDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { agreementId } = req.params;
    if (!agreementId) {
        res.status(400).json({ error: "Agreement ID is required" });
        return;
    }
    const parsedAgreementId = parseInt(agreementId);
    try {
        const fetchedAgreements = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select({
            agreementId: agreements_1.default.id,
            pfiId: agreements_1.default.pfiId,
            agreementNumber: agreements_1.default.agreementNumber,
            agreementAmount: agreements_1.default.agreementAmount,
            commencementDate: agreements_1.default.commencementDate,
            expiryDate: agreements_1.default.expiryDate,
            agreementPeriod: agreements_1.default.agreementPeriod,
        }).from(agreements_1.default).where((0, drizzle_orm_1.eq)(agreements_1.default.id, parsedAgreementId)));
        if (fetchedAgreements.length === 0) {
            res.status(200).json({
                success: true,
                message: "No agreement found for this PFI",
                agreement: {},
                documents: [],
            });
            return;
        }
        const storedDocuments = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select({
            documentId: documents_1.default.id,
            documentName: documents_1.default.name,
            documentUrl: documents_1.default.url,
        }).from(documents_1.default).where((0, drizzle_orm_1.eq)(documents_1.default.agreementId, fetchedAgreements[0].agreementId)));
        res.status(200).json({
            success: true,
            message: "Agreement details fetched successfully",
            agreement: fetchedAgreements[0],
            documents: storedDocuments !== null && storedDocuments !== void 0 ? storedDocuments : [],
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: error, agreement: {}, documents: [] });
    }
});
exports.getAgreementDetails = getAgreementDetails;
