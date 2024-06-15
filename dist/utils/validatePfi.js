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
const drizzle_orm_1 = require("drizzle-orm");
const user_1 = __importDefault(require("../db/schema/user"));
const setup_1 = require("../db/setup");
const validatePfi = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchPfi = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select().from(user_1.default).where((0, drizzle_orm_1.eq)(user_1.default.email, email)));
        if (!fetchPfi || fetchPfi.length === 0) {
            return {
                isActive: false,
                message: "Pfi not found",
                statusCode: 404,
            };
        }
        if (fetchPfi[0].isActive === false) {
            return {
                isActive: false,
                message: "Pfi is not approved yet",
                statusCode: 401,
            };
        }
    }
    catch (error) {
        console.log(error);
        return {
            isActive: false,
            message: "Internal server error",
            statusCode: 500,
        };
    }
    return {
        isActive: true,
        message: "Pfi is active",
        statusCode: 200,
    };
});
exports.default = validatePfi;
