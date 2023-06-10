const User = require("../Models/user");
const SibApiV3Sdk = require("sib-api-v3-sdk");

exports.forgotpass = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const defaultClient = SibApiV3Sdk.ApiClient.instance;

      const apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey = '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';

      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      const sender = {
        email: 'anandverma762@gmail.com',
        name: 'Anand Kumar Verma'
      }

      const recipient = [{
        email: 'anandrohit24072001@gmail.com'
      }]

      const emailData = {
        sender,
        to: recipient,
        subject: "Welcome Notice",
        htmlContent: "Congratulations! You successfully sent this example campaign via the Brevo API."
      };

      apiInstance.sendTransacEmail(emailData)
        .then(() => {
          console.log("Email sent successfully");
          res.status(200).json({ message: "Email sent successfully" });
        })
        .catch(error => {
          console.error("Failed to send email:", error);
          res.status(500).json({ message: "Failed to send email" });
        });
    }  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
