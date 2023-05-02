// To connect with your mongoDB database
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
  })
  .then(() => console.log("Connected to Your_db database"))
  .catch((err) => console.log(err));

// Schema for users of ap*+..35\
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  user_create: {
    type: String,
    required: false,
  },
  user_create_name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CommentSchema = new mongoose.Schema({
  pinId: {
    type: String,
    required: true,
  },
  userCreateComment: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const ReportSchema = new mongoose.Schema({
  pinData: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", UserSchema);
const Post = mongoose.model("posts", PostSchema);
const Comment = mongoose.model("comments", CommentSchema);
const Report = mongoose.model("reports", ReportSchema);

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// For backend and express
const express = require("express");
const app = express();
const cors = require("cors");

console.log("App is listening on port 5000");
app.use(express.json({ limit: "300mb" }));
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("App is Working");
});

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already registered");
    }
  } catch (e) {
    console.log(e);
    resp.send("Something Went Wrong");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const alluser = await User.find({});
    const user = alluser.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // localStorage.setItem("user", "test");
      res.send(user);
    } else {
      res.send("Wrong id or password");
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/comment", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    let result = await comment.save();
    result = result.toObject();
    if (result) {
      res.send(req.body);
      console.log(result);
      console.log("Report Successful");
    } else {
      console.log("Error saving comment");
    }
  } catch (e) {
    console.log(e);
    res.send("Something went Wrong");
  }
});

app.post("/post", async (req, resp) => {
  try {
    const post = new Post(req.body);
    let result = await post.save();
    result = result.toObject();
    if (result) {
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("Error saving post");
    }
  } catch (e) {
    console.log(e);
    resp.send("Something Went Wrong");
  }
});

// app.post("/report", async (req, res) => {
//   try {
//     const report = new Report(req.body);
//     let result = await report.save();
//     result = result.toObject;
//     if (result) {
//       res.send(req.body);
//       conosole.log(result);
//     } else {
//       console.log("Error saving report");
//     }
//   } catch (e) {
//     console.log(e);
//     res.send("Someting went wrong");
//   }
// });
app.post("/report", async (req, res) => {
  try {
    const report = new Report(req.body);
    let result = await report.save();
    result = result.toObject;
    if (result) {
      console.log(result);
    } else {
      console.log("Error saving report");
    }
    res.send(req.body);
  } catch (e) {
    console.log(e);
    res.send("Someting went wrong");
  }
});

app.get("/getAllPost", async (req, res) => {
  try {
    const allpost = await Post.find({});
    res.send({ status: "ok", data: allpost });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getAllComment", async (req, res) => {
  try {
    const allComment = await Comment.find({});
    res.send({ status: "ok", data: allComment });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getAllReport", async (req, res) => {
  try {
    const allReport = await Report.find({});
    res.send({ status: "ok", data: allReport });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.put("/editpost/:id", async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id;
    const update = req.body;
    const result = await Post.findByIdAndUpdate(id, update, { new: true });
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      console.log("Error updating post");
      res.status(404).send("Post not found");
    }
  } catch (e) {
    console.log(e);
    res.send("Something went wrong");
  }
});

app.delete("/deletePost/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log(postId);
    const deletedPost = await Post.findByIdAndDelete(postId);
    res.send({
      status: "ok",
      message: `Post with ID ${postId} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "An error occurred while deleting the post",
    });
  }
});

app.delete("/deleteReport/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log(postId);
    const deletedReport = await Report.findByIdAndDelete(postId);
    res.send({
      status: "ok",
      message: `Post with ID ${postId} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "An error occurred while deleting the post",
    });
  }
});

app.delete("/deleteComment/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    console.log(commentId);
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    res.send({
      status: "ok",
      message: `Post with ID ${commentId} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "An error occurred while deleting the post",
    });
  }
});

app.delete("/deleteUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send({
      status: "ok",
      message: `User with ID ${userId} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "An error occurred while deleting the post",
    });
  }
});

app.listen(5000);
