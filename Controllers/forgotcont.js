const User = require("../Models/user");
const fpr = require("../Models/forgotpasswordrequests");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");


exports.forgotpass = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const uuid = uuidv4();
      console.log(uuid);
      const savedata = { id: uuid, userId: user.id, isactive: true };
      await fpr.create(savedata);
      const defaultClient = SibApiV3Sdk.ApiClient.instance;

      const apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey =
        "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";

      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      const sender = {
        email: "anandverma762@gmail.com",
        name: "Anand Kumar Verma",
      };

      const recipient = [
        {
          email: email,
        },
      ];

      const resetUrl = `http://localhost:9000/password/resetpassword/${uuid}`;

      const emailContent = `
        Congratulations! You have requested a password reset.<br>
        Please click the following link to reset your password: <br>
        <a href="${resetUrl}">Reset Password</a>
      `;
      const emailData = {
        sender,
        to: recipient,
        subject: "Welcome Notice",
        htmlContent: emailContent,
      };

      apiInstance
        .sendTransacEmail(emailData)
        .then(() => {
          console.log("Email sent successfully");
          res.status(200).json({ message: "Email sent successfully" });
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
          res.status(500).json({ message: "Failed to send email" });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.resetpass = async (req, res, next) => {
    const uid = req.params.uuid;
    try {
      const user = await fpr.findOne({where: {id: uid}});
      if (user) {
        if (user.isactive) {
          await fpr.update({ isactive: false },{where :{id: uid}});
        const resetPasswordLink = `http://localhost:9000/resetpassword.html?uuid=${uid}`;

          res.redirect(resetPasswordLink);
        } else {
          // Handle the case when the user is already inactive
          res.status(400).json({ message: 'Invalid reset request' });
        }
      } else {
        // Handle the case when the user is not found
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  exports.updatepass = async (req,res,next) =>{
    const newpass = req.body.password;
    const uid = req.body.uuid;
    try{
    const user = await fpr.findOne({where: {id: uid}});
    if(user){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newpass, saltRounds);
        const userId = user.userId;
        await User.update({password: hashedPassword},{where: {id: userId}});
        res.status(200).json({redirect: 'http://localhost:9000/login.html'});
    }
    
    }catch(err){
        console.log(err);
    }
  }