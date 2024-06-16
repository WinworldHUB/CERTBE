"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullApiKey = exports.BREVO_CONFIG = void 0;
exports.BREVO_CONFIG = {
    API_KEY_PREFIX: "xkeysib",
    API_KEY_MAJOR: "-e8a0391fb166701a2e742c9dc85c54555d-d29721263b30829f5655a2cf32c513-",
    API_KEY_MINOR: "ZJY93EsJf0lvJH6X",
};
const getFullApiKey = () => {
    return `${exports.BREVO_CONFIG.API_KEY_PREFIX}${exports.BREVO_CONFIG.API_KEY_MAJOR}${exports.BREVO_CONFIG.API_KEY_MINOR}`;
};
exports.getFullApiKey = getFullApiKey;
