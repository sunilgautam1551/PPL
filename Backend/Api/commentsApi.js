let userUpload = require("../Schemas/upload");

module.exports = {
  postingComments: async function (data) {
    let textData = data.commentdata;
    let userInfo = data.commentby;

    let result = await userUpload.updateOne(
      { _id: data._id },
      {
        $inc: { comment: 1 },
        $push: { commentdata: textData, commentby: userInfo },
      }
    );
    return result;
  },
};