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
exports.login = exports.register = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const user_1 = __importDefault(require("../db/schema/user"));
const setup_1 = require("../db/setup");
const stytchClient_1 = __importDefault(require("../stytchClient"));
const validateUser_1 = __importDefault(require("../utils/validateUser"));
const pfi_1 = __importDefault(require("../db/schema/pfi"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userFullName, email, phone, address, password, orgName, } = req.body;
    if (!userFullName || !email || !phone || !address || !password || !orgName) {
        return res
            .status(400)
            .json({ success: false, data: null, message: "All fields are required" });
    }
    try {
        const first_name = userFullName.split(" ")[0];
        const last_name = userFullName.split(" ")[1];
        const stytchresponse = yield stytchClient_1.default.passwords.create({
            name: { first_name: first_name, last_name: last_name },
            email: email,
            password: password,
            session_duration_minutes: 527040,
        });
        if (stytchresponse.status_code === 200) {
            yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.insert(user_1.default).values({
                fullName: userFullName,
                email: email,
                phoneNo: phone,
                role: "USER",
                isPrimary: true,
            }));
            const postPfi = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.insert(pfi_1.default).values({
                name: orgName,
                address: address,
            }).returning({ insertedId: pfi_1.default.id }));
            const pfiId = postPfi[0].insertedId;
            return res.status(201).json({
                success: true,
                message: "Added Successfully",
                session_duration: "366 days",
                userFullName: userFullName,
                pfiId: pfiId,
                userRole: "USER",
                session_token: stytchresponse.session_token,
                session_jwt: stytchresponse.session_jwt,
            });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, data: null, message: "Unable to add", error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({
            success: false,
            pfiId: "",
            message: "All fields are required",
            session_duration: "",
            session_token: "",
            session_jwt: "",
            fullName: "",
        });
    }
    try {
        const validatedUser = yield (0, validateUser_1.default)(email);
        if (!validatedUser.isActive) {
            return res.status(validatedUser.statusCode).json({
                success: false,
                pfiId: "",
                message: validatedUser.message,
                session_duration: "",
                session_token: "",
                session_jwt: "",
                fullName: "",
            });
        }
        if (validatedUser.isActive) {
            const stytchresponse = yield stytchClient_1.default.passwords.authenticate({
                email: email,
                password: password,
                session_duration_minutes: 527040,
            });
            if (stytchresponse.status_code === 200) {
                const storedUser = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select().from(user_1.default).where((0, drizzle_orm_1.eq)(user_1.default.email, email)));
                if (!storedUser[0].parentId) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found",
                        session_duration: "",
                        session_token: "",
                        pfiId: "",
                        session_jwt: "",
                        fullName: "",
                    });
                }
                const storedPfi = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select().from(pfi_1.default).where((0, drizzle_orm_1.eq)(pfi_1.default.id, storedUser[0].parentId)));
                const pfiId = storedPfi[0].id;
                const userFullName = storedUser[0].fullName;
                return res.status(201).json({
                    success: true,
                    message: "Logged In Successfully",
                    session_duration: "366 days",
                    session_token: stytchresponse.session_token,
                    session_jwt: stytchresponse.session_jwt,
                    fullName: userFullName,
                    userRole: storedUser[0].role,
                    pfiId: pfiId,
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to login",
            error,
            session_duration: "",
            session_token: "",
            pfiId: "",
            session_jwt: "",
            fullName: "",
        });
    }
});
exports.login = login;
