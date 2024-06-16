import { BREVO_CONFIG, getFullApiKey } from "../constants";

const brevo = require("@getbrevo/brevo");
let apiInstance = new brevo.TransactionalEmailsApi();

let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey =
  BREVO_CONFIG.API_KEY_PREFIX +
  BREVO_CONFIG.API_KEY_MAJOR +
  BREVO_CONFIG.API_KEY_MINOR;

let sendSmtpEmail = new brevo.SendSmtpEmail();

const sendWelcomeEmail = async (email: string) => {
  sendSmtpEmail.templateId = 1;

  sendSmtpEmail.to = [{ email: email }];
  await apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .then((data: any) => {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    })
    .catch((error: any) => {
      console.error(error);
    });
};

export default sendWelcomeEmail;
