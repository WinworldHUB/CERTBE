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
exports.approveAgreementPayment = exports.rejectAgreement = exports.createAgreement = exports.approveAgreement = exports.getAgreementbyPfiId = exports.getAllAgreements = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const agreements_1 = __importDefault(require("../db/schema/agreements"));
const setup_1 = require("../db/setup");
const pfi_1 = __importDefault(require("../db/schema/pfi"));
const documents_1 = __importDefault(require("../db/schema/documents"));
const getAllAgreements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedAgreements = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select({
            agreementId: agreements_1.default.id,
            pfiId: agreements_1.default.pfiId,
            orgName: pfi_1.default.name,
            status: agreements_1.default.status,
            orgAddress: pfi_1.default.address,
            agreementAmount: agreements_1.default.agreementAmount,
            commencementDate: agreements_1.default.commencementDate,
            expiryDate: agreements_1.default.expiryDate,
            period: agreements_1.default.agreementPeriod,
        }).from(agreements_1.default).leftJoin(pfi_1.default, (0, drizzle_orm_1.eq)(agreements_1.default.pfiId, pfi_1.default.id)).where((0, drizzle_orm_1.eq)(agreements_1.default.isActive, true)));
        if (fetchedAgreements.length === 0) {
            res
                .status(200)
                .json({
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
        orgAddress: pfi_1.default.address,
        agreementAmount: agreements_1.default.agreementAmount,
        commencementDate: agreements_1.default.commencementDate,
        expiryDate: agreements_1.default.expiryDate,
        period: agreements_1.default.agreementPeriod,
    }).from(agreements_1.default).leftJoin(pfi_1.default, (0, drizzle_orm_1.eq)(agreements_1.default.pfiId, parsedPfiId)).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(agreements_1.default.pfiId, parsedPfiId), (0, drizzle_orm_1.eq)(agreements_1.default.isActive, true))));
    if (fetchedAgreements.length === 0) {
        res
            .status(404)
            .json({ success: false, message: "No agreement found for this PFI" });
        return;
    }
    const storedDocuments = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select({
        documentId: documents_1.default.id,
        documentName: documents_1.default.name,
        documentUrl: documents_1.default.url,
    }).from(documents_1.default).where((0, drizzle_orm_1.eq)(documents_1.default.agreementId, fetchedAgreements[0].agreementId)));
    res.status(200).json({
        success: true,
        agreement: fetchedAgreements[0],
        documents: storedDocuments !== null && storedDocuments !== void 0 ? storedDocuments : [],
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
        res.status(400).json({ error: "Agreement data is required" });
        return;
    }
    const newAgreement = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.insert(agreements_1.default).values({
        pfiId,
        agreementAmount,
        agreementPeriod,
        commencementDate,
        expiryDate,
    }));
    res.status(201).json(newAgreement);
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
