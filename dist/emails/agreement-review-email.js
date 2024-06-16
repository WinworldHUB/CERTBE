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
exports.sendAgreementRequestEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const constants_1 = require("../constants");
mail_1.default.setApiKey(`${constants_1.SENDGRID_CONFIG.API_KEY_PREFIX}${constants_1.SENDGRID_CONFIG.API_KEY_MAJOR}${constants_1.SENDGRID_CONFIG.API_KEY_MINOR}`);
const sendAgreementRequestEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: email,
        from: "amit.b.dubey@gmail.com",
        subject: "Agreement request recieved!",
        text: "Registration request recieved!",
        html: "<p>Thank you for providing agreement details. Our team is reviewing the same and shall provide their feedback.</p>",
    };
    mail_1.default.send(msg).then(() => { }, (error) => {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    });
});
exports.sendAgreementRequestEmail = sendAgreementRequestEmail;
