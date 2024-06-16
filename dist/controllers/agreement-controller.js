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
exports.approveAgreementPayment = exports.rejectAgreement = exports.createAgreement = exports.approveAgreement = exports.getAgreementbyPfiId = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const agreements_1 = __importDefault(require("../db/schema/agreements"));
const setup_1 = require("../db/setup");
const getAgreementbyPfiId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pfiId } = req.params;
    if (!pfiId) {
        res.status(400).json({ error: "PFI ID is required" });
        return;
    }
    const parsedPfiId = parseInt(pfiId);
    const pfis = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select().from(agreements_1.default).where((0, drizzle_orm_1.eq)(agreements_1.default.pfiId, parsedPfiId)));
    res.status(200).json(pfis);
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
    const { pfiId, agreementAmount, agreementPeriod, commencementDate, expiryDate } = req.body;
    if (!pfiId || !agreementAmount || !agreementPeriod || !commencementDate || !expiryDate) {
        res.status(400).json({ error: "Agreement data is required" });
        return;
    }
    const newAgreement = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.insert(agreements_1.default).values({
        pfiId,
        agreementAmount,
        agreementPeriod,
        commencementDate,
        expiryDate
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
