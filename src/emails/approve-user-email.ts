import sgMail from "@sendgrid/mail";
import { SENDGRID_CONFIG } from "../constants";

sgMail.setApiKey(
  `${SENDGRID_CONFIG.API_KEY_PREFIX}${SENDGRID_CONFIG.API_KEY_MAJOR}${SENDGRID_CONFIG.API_KEY_MINOR}`
);

const sendRegistrationApprovalEmail = async (email: string) => {
  const msg = {
    to: email,
    from: "amit.b.dubey@gmail.com",
    subject: "Registration request Success!",
    text: "Registration request Success!",
    html: "<p>Welcome to ZCGS, your registration details have been reviewed and approved. Your account is not active and available for logging in</p>",
  };

  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

export { sendRegistrationApprovalEmail };
