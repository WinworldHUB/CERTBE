export const BREVO_CONFIG = {
  API_KEY_PREFIX: "xkeysib",
  API_KEY_MAJOR:
    "-e8a0391fb166701a2e742c9dc85c54555d-d29721263b30829f5655a2cf32c513-",
  API_KEY_MINOR: "ZJY93EsJf0lvJH6X",
};

export const getFullBrevoApiKey = (): string => {
  return `${BREVO_CONFIG.API_KEY_PREFIX}${BREVO_CONFIG.API_KEY_MAJOR}${BREVO_CONFIG.API_KEY_MINOR}`;
};


export const SENDGRID_CONFIG = {
  API_KEY_PREFIX: "SG.",
  API_KEY_MAJOR: "RC_7dAJfTW6121MODQ0UQg.",
  API_KEY_MINOR: "6nT65NQ2mqUUE5kJN22kITh7mCwYqYIuiRwnn9hJgho",
};


export enum AGREEMENT_STATUS {
  SUBMITTED = "SUBMITTED",
  RESPONSE_REQUESTED = "RESPONSE_REQUESTED",
  PAYMENT_REQUESTED = "PAYMENT_REQUESTED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}