let userUpload = require("../Schemas/upload");
let userDetail = require("../Schemas/mongoSchema");
module.exports = {
  showUploadImages: async function (data) {
    let lt=parseInt(data.limit);
    let sp=parseInt(data.skip);
    let result = await userUpload.find({}). populate("userGet").sort({_id:-1}).limit(lt).skip(sp)// key to populate
    // console.log(result);
    return result;
  },
  // myUploadsShow:async function(data){
  //   let result =await userUpload.find({data.username});
  //   return result;
  // }
};
