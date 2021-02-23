let userUpload = require("../Schemas/upload");

module.exports = {
  showUploadImages: async function (data) {
    let result = await userUpload.find({});
    return result;
  },
};
