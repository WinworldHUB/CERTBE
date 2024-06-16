"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateAgreementNumber = (commencementDate, pfiId) => {
    const prefix = "ZCGS";
    const formattedDate = formatDate(commencementDate);
    return `${prefix}_${formattedDate}_${pfiId}`;
};
const formatDate = (date) => {
    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, "");
};
exports.default = generateAgreementNumber;
