import sgMail from "@sendgrid/mail";
import { SENDGRID_CONFIG } from "../constants";

sgMail.setApiKey(
  `${SENDGRID_CONFIG.API_KEY_PREFIX}${SENDGRID_CONFIG.API_KEY_MAJOR}${SENDGRID_CONFIG.API_KEY_MINOR}`
);

const sendWelcomeEmail = async (email: string) => {
  const msg = {
    to: email,
    from: "amit.b.dubey@gmail.com",
    subject: "Registration request recieved!",
    text: "Registration request recieved!",
    html: "<p>We have received your registration request. Our team will be reviewing the details and provide their feedback.</p>",
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

export { sendWelcomeEmail };
