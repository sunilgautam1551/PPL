const Router = require("express").Router();
let userDetail = require("../Schemas/mongoSchema");
let userUpload = require("../Schemas/upload");
let userApi = require("../Api/userApi");
let commentsApi = require("../Api/commentsApi");
let postLikeApi = require("../Api/postLikeApi");
let postDislikeApi = require("../Api/postDislikeApi");
let uploadPostApi = require("../Api/uploadPostApi");
let resetPasswordApi = require("../Api/resetPasswordApi");
let forgotApi = require("../Api/forgotApi");
let config = require("../Config/config");
const auth = require("../middleware/auth");
let jwt = require("jsonwebtoken");
let fs = require("fs");
const multer = require("multer");
const { userInfo } = require("os");
const nodemailer = require("nodemailer");
const { response } = require("express");

Router.get("/loginPage", (req, res) => {
  console.log("login page");
  res.send("login page");
});

Router.post(config.loginUrl, async (req, res) => {
  const checkUserExist = await userApi.checkUser(req.body);
  const newToken = await jwt.sign(req.body.email, config.tokenKey);
  console.log(newToken);
  let loginCredentials = {
    message: checkUserExist,
    lastToken: newToken,
  };
  res.send(loginCredentials);
});

Router.get("/signUpPage", (req, res) => {
  console.log("signUp page");
});

Router.post(config.signUpUrl, auth, async (req, res) => {
  const checkUserExist = await userApi.checkRegister(req.body);
  console.log(checkUserExist);
  res.send(checkUserExist);
});

const fileStorageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

Router.post(
  "/showUpload",
  auth,
  upload.single("filename"),
  async (req, res) => {
    let titleValue = req.body.title;
    let categoryValue = req.body.category;
    let file = req.file.filename;
    let info = req.body.username;
    let dateInfo = new Date().toDateString();
    let timeInfo = new Date().toTimeString();
    console.log(info);
    let userId = await userDetail.findOne({ email: info });
    console.log("user id is ", userId.data);
    let user_id = userId.id;
    console.log("user id is ", user_id);

    userUpload.create({
      title: titleValue,
      category: categoryValue,
      filename: file,
      username: info,
      date: dateInfo,
      time: timeInfo,
      userGet: user_id,
    });
    res.send("hello");
  }
);

Router.get("/showUploadImage", auth, async (req, res) => {
  console.log(req.query)
  let showUploadImages = await uploadPostApi.showUploadImages(req.query);
  res.send(showUploadImages);
});

Router.post("/postComments", auth, async (req, res) => {
  const PostingComments = await commentsApi.postingComments(req.body);
  res.send(PostingComments);
});

Router.post("/postLikes", auth, async (req, res) => {
  const postLiking = await postLikeApi.postLiking(req.body);
  res.send(postLiking);
});

Router.post("/postDisLikes", auth, async (req, res) => {
  const postDislike = await postDislikeApi.postDisliking(req.body);
  res.send(postDislike);
});

Router.post("/forgot", async (req, res) => {
  const forgotPassword = await forgotApi.forgotPassword(req.body);
  res.send(forgotPassword);
});

Router.post("/reset", auth, async (req, res) => {
  let resetPassword = await resetPasswordApi.resetPassword(req.body);
  res.send(resetPassword);
});

module.exports = Router;