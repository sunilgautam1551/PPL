let userDetail = require("../Schemas/mongoSchema");

module.exports = {
  resetPassword: async function (data) {
    const passwordOne = data.pass;
    console.log(passwordOne);
    console.log(data.email);
    const userEmail1 = await userDetail.find({ email: data.email });
    console.log(userEmail1);
    if (userEmail1) {
      await userDetail.updateOne(
        { email: data.email },
        { $set: { password: passwordOne } }
      );
    }
  },
};
