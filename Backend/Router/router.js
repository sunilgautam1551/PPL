let config = require("../Config/config");
const Router = require("express").Router();
let userApi = require("../Api/userApi");
let commentsApi = require("../Api/commentsApi");
let postLikeApi = require("../Api/postLikeApi");
let postDislikeApi = require("../Api/postDislikeApi");
let uploadPostApi = require("../Api/uploadPostApi");
let resetPasswordApi = require("../Api/resetPasswordApi");
let forgotApi = require("../Api/forgotApi");
let userUpload = require("../Schemas/upload");
let fs = require("fs");
const multer = require("multer");
const { userInfo } = require("os");
const nodemailer = require("nodemailer");
let userDetail = require("../Schemas/mongoSchema");
const { response } = require("express");

Router.get("/loginPage", (req, res) => {
  console.log("login page");
  res.send("login page");
});

Router.post(config.loginUrl, async (req, res) => {
  const checkUserExist = await userApi.checkUser(req.body);
  res.send(checkUserExist);
});

Router.get("/signUpPage", (req, res) => {
  console.log("signUp page");
});

Router.post(config.signUpUrl, async (req, res) => {
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

Router.post("/showUpload", upload.single("filename"), (req, res) => {
  let titleValue = req.body.title;
  let categoryValue = req.body.category;
  let file = req.file.filename;
  let info = req.body.username;
  let dateInfo = new Date().toDateString();
  let timeInfo = new Date().toTimeString();
  userUpload.create({
    title: titleValue,
    category: categoryValue,
    filename: file,
    username: info,
    date: dateInfo,
    time: timeInfo,
  });
});

Router.post("/showUploadImage", async (req, res) => {
  let showUploadImages = await uploadPostApi.showUploadImages(req.body);
  res.send(showUploadImages);
});

Router.post("/postComments", async (req, res) => {
  const PostingComments = await commentsApi.postingComments(req.body);
  res.send(PostingComments);
});

Router.post("/postLikes", async (req, res) => {
  const postLiking = await postLikeApi.postLiking(req.body);
  res.send(postLiking);
});

Router.post("/postDisLikes", async (req, res) => {
  const postDislike = await postDislikeApi.postDisliking(req.body);
  res.send(postDislike);
});

Router.post("/forgot", async (req, res) => {
  const forgotPassword = await forgotApi.forgotPassword(req.body);
  res.send(forgotPassword);
});

Router.post("/reset", async (req, res) => {
  let resetPassword = await resetPasswordApi.resetPassword(req.body);
  res.send(resetPassword);
});

module.exports = Router;
