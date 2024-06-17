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
exports.approvePfi = exports.fetchAllPfi = void 0;
const pfi_1 = __importDefault(require("../db/schema/pfi"));
const setup_1 = require("../db/setup");
const drizzle_orm_1 = require("drizzle-orm");
const fetchAllPfi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pfis = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select({
            pfiId: pfi_1.default.id,
            pfiName: pfi_1.default.name,
            pfiAddress: pfi_1.default.address,
            isActive: pfi_1.default.isActive,
        }).from(pfi_1.default));
        res.status(200).json({ success: true, pfis: pfis !== null && pfis !== void 0 ? pfis : [], message: "Pfis fetched successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error, pfis: [] });
    }
});
exports.fetchAllPfi = fetchAllPfi;
const approvePfi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pfiId } = req.params;
    if (!pfiId) {
        return res.status(400).json({
            success: false,
            message: "Pfi id is required",
        });
    }
    const parsedPfiId = parseInt(pfiId);
    try {
        const updatePfi = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.update(pfi_1.default).set({ isActive: true }).where((0, drizzle_orm_1.eq)(pfi_1.default.id, parsedPfiId)));
        if (updatePfi) {
            return res.status(200).json({
                success: true,
                message: "Pfi approved successfully",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.approvePfi = approvePfi;
