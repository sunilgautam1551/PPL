let userDetail = require("../Schemas/mongoSchema");

module.exports = {
  checkUser: async function (data) {
    const password = data.password;
    const userEmail1 = await userDetail.findOne({ email: data.email });
    
    if (userEmail1.password === password) {
      return "Success";
    } else {
      return "Incorrect!";
    }
  },

  checkRegister: async function (data) {
    const userEmail1 = await userDetail.findOne({ email: data.email });
    if (userEmail1) {
      return "Already exist";
    } else {
      userDetail.create(data);
      return "created";
    }
  },
};
