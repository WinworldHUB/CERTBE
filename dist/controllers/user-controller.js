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
exports.approveUser = exports.fetchAllUsersFromPfi = exports.fetchAllUsersFromEmail = void 0;
const user_1 = __importDefault(require("../db/schema/user"));
const setup_1 = require("../db/setup");
const drizzle_orm_1 = require("drizzle-orm");
const fetchAllUsersFromEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        return res
            .status(400)
            .json({ success: false, data: null, message: "Email is required" });
    }
    const users = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select().from(user_1.default).where((0, drizzle_orm_1.eq)(user_1.default.email, email)));
    return res.status(200).json({ success: true, data: users });
});
exports.fetchAllUsersFromEmail = fetchAllUsersFromEmail;
const fetchAllUsersFromPfi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parentId } = req.params;
    if (!parentId) {
        res.status(400).json({ error: "PFI ID is required" });
        return;
    }
    const parsedParentId = parseInt(parentId);
    const users = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select().from(user_1.default).where((0, drizzle_orm_1.eq)(user_1.default.parentId, parsedParentId)));
    res.status(200).json(users);
});
exports.fetchAllUsersFromPfi = fetchAllUsersFromPfi;
const approveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User id is required",
        });
    }
    const parsedUserId = parseInt(userId);
    try {
        const updateUser = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.update(user_1.default).set({ isActive: true }).where((0, drizzle_orm_1.eq)(user_1.default.id, parsedUserId)));
        if (updateUser) {
            return res.status(200).json({
                success: true,
                message: "User approved successfully",
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
exports.approveUser = approveUser;
