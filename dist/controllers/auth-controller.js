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
            const postPfi = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.insert(pfi_1.default).values({
                name: orgName,
                address: address,
            }).returning({ insertedId: pfi_1.default.id }));
            const pfiId = postPfi[0].insertedId;
            yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.insert(user_1.default).values({
                fullName: userFullName,
                email: email,
                phoneNo: phone,
                role: "USER",
                isPrimary: true,
                parentId: pfiId,
            }));
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
        return res.status(400).json({
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
                const storedUser = yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.select({
                    fullName: user_1.default.fullName,
                    role: user_1.default.role,
                    pfiId: user_1.default.parentId,
                    orgName: pfi_1.default.name,
                    orgAddress: pfi_1.default.address,
                }).from(user_1.default).leftJoin(pfi_1.default, (0, drizzle_orm_1.eq)(user_1.default.parentId, pfi_1.default.id)).where((0, drizzle_orm_1.eq)(user_1.default.email, email)));
                if (!storedUser[0]) {
                    return res.status(404).json({
                        success: false,
                        message: "Unable to login",
                        session_duration: "",
                        session_token: "",
                        pfiId: "",
                        session_jwt: "",
                        fullName: "",
                        orgName: "",
                        orgAddress: "",
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: "Logged In Successfully",
                    session_duration: "366 days",
                    session_token: stytchresponse.session_token,
                    session_jwt: stytchresponse.session_jwt,
                    fullName: storedUser[0].fullName,
                    userRole: storedUser[0].role,
                    pfiId: storedUser[0].pfiId,
                    orgName: storedUser[0].orgName,
                    orgAddress: storedUser[0].orgAddress,
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
            orgName: "",
            orgAddress: "",
        });
    }
});
exports.login = login;
