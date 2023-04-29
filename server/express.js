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
  date: {
    type: Date,
    default: Date.now,
  },
});

const CommentSchema = new mongoose.schema({
  account: {
    type: String,
  },
  text: {
    type: String,
  },
});
const User = mongoose.model("users", UserSchema);
const Post = mongoose.model("posts", PostSchema);
const comment = mongoose.model("comments", CommentSchemas);
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
      res.send("Wrond id or password");
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

app.listen(5000);
