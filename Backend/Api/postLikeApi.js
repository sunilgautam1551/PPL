let userUpload = require("../Schemas/upload");

module.exports = {
  postLiking: async function (data) {
    let postLikes = await userUpload.updateOne(
      { $and: [{ _id: data._id }, { likedby: { $ne: data.username } }] },
      { $inc: { like: 1 }, $push: { likedby: data.username } }
    );
    return postLikes;
  },
};
