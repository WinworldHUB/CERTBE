"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const generateAgreementNumber = (commencementDate, pfiId) => {
    const prefix = "ZCGS";
    const formattedDate = formatDate(commencementDate);
    return `${prefix}_${formattedDate}_${pfiId}`;
};
const formatDate = (date) => {
    return luxon_1.DateTime.fromJSDate(date).toFormat("ddLLLyyyy");
};
exports.default = generateAgreementNumber;
