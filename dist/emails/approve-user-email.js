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
exports.sendRegistrationApprovalEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const constants_1 = require("../constants");
mail_1.default.setApiKey(`${constants_1.SENDGRID_CONFIG.API_KEY_PREFIX}${constants_1.SENDGRID_CONFIG.API_KEY_MAJOR}${constants_1.SENDGRID_CONFIG.API_KEY_MINOR}`);
const sendRegistrationApprovalEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: email,
        from: "amit.b.dubey@gmail.com",
        subject: "Registration request Success!",
        text: "Registration request Success!",
        html: "<p>Welcome to ZCGS, your registration details have been reviewed and approved. Your account is not active and available for logging in</p>",
    };
    mail_1.default.send(msg).then(() => { }, (error) => {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    });
});
exports.sendRegistrationApprovalEmail = sendRegistrationApprovalEmail;
