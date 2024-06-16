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
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const brevo = require("@getbrevo/brevo");
let apiInstance = new brevo.TransactionalEmailsApi();
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey =
    constants_1.BREVO_CONFIG.API_KEY_PREFIX +
        constants_1.BREVO_CONFIG.API_KEY_MAJOR +
        constants_1.BREVO_CONFIG.API_KEY_MINOR;
let sendSmtpEmail = new brevo.SendSmtpEmail();
const sendWelcomeEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    sendSmtpEmail.templateId = 1;
    sendSmtpEmail.to = [{ email: email }];
    yield apiInstance
        .sendTransacEmail(sendSmtpEmail)
        .then((data) => {
        console.log("API called successfully. Returned data: " + JSON.stringify(data));
    })
        .catch((error) => {
        console.error(error);
    });
});
exports.default = sendWelcomeEmail;
