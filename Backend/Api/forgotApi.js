let userDetail = require("../Schemas/mongoSchema");
const nodemailer = require("nodemailer");
let config = require("../Config/config");
module.exports = {
  forgotPassword: async function (data) {
    let result;
    console.log(data);
    let a = await userDetail.findOne({ email: data.email });
    console.log(a);

    if (a) {
      let token = Math.random().toString(36).substring(7);

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "cu.17bcs1143@gmail.com",
          pass: config.password,
        },
      });

      var mailOptions = {
        from: "cu.17bcs1143@gmail.com",
        to: "sunil.gautam@daffodilsw.com",
        subject: "Node.js Password Reset",
        text: token,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          //   res.redirect('/forgot');
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      result = token;
    } else if (a == null) {
      result = "Email doesn't Exist";
    }

    return result;
  },
};
