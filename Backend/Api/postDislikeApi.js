let userUpload = require("../Schemas/upload");

module.exports = {
  postDisliking: async function (data) {
    let postDislike = await userUpload.updateOne(
      { $and: [{ _id: data._id }, { likedby: data.username }] },
      { $inc: { like: -1 }, $pull: { likedby: data.username } }
    );
  },
};
