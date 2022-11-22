import express from "express";

import {BlogModel} from "../schema/blog.js";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  // find blogs based on no condition==> get all blogs
  const blogs = await BlogModel.find({});
  // convert each blog to an object and send an array to client
  return res.send(blogs.map((blog) => blog.toObject()));
});


router.post('/delete', async (req, res) => {
  const body = req.body;
  console.log(`[LOG] DELETION ${body.content}`);
    // body should be JSON
  if (!req.app.locals.auth) {
    console.log("[DELETE] NOT LOGGED IN");
    return res.send({title:"NOT LOGGED IN", content:"LOG IN"});
  }
  // Perform delete...
  try {
  await BlogModel.deleteOne({"title": String(body.content)});
  }
  catch (e) {console.log(e);}
});

router.post('/auth', (req, res) => {
  const body = req.body;
  console.log("[LOG] POST ON AUTH");
  if (!body.hasOwnProperty('title')) {
    return res.send({title: "FAIL", content: "FAILED TO LOG IN"});
  }
    
  loginAttempt(req, res, body.content);
  if (req.successful){ 
    req.app.locals.auth = true;
    console.log("Login Successful!");
    return res.send({title: "SUCCESS", content: "LOGGED IN"});
  } else {
      console.log("Login Attempt Failure!");
      return res.send({title: "FAIL", content: "FAILED TO LOG IN"});
    // res.sendFile(path.join(__dirname, '../public/invalid.html'));
  }
})


function loginAttempt(req, res, password) {
  console.log(`[LOGIN ATTEMPT]: Password: ${password}`);
  if (password == 'password') {
    req.successful = true;
  } else req.successful = false;
}



router.post("/create-post", async (req, res) => {
  // body should be JSON
  if (!req.app.locals.auth) {
    console.log("NOT LOGGED IN");
    return res.send({title:"NOT LOGGED IN", content:"LOG IN"});
  }

  const body = req.body;
  // create blog model with the request body
  if (body.hasOwnProperty('content') && body.hasOwnProperty('title')) {
    console.log(`[LOG] NEW BLOG POST: ${body}`);
    const blog = new BlogModel({content: body.content, title: body.title});
    // remember to await .save();
    // save to mongodb
    await blog.save();
    // get an object representation and send it back to the client
    return res.send(blog.toObject());
  } else {
    console.log(`[ERROR] Creating Blog Post`)
  }
});

export default router;
