// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000
}).then(() => console.log('Connected to Your_db database'))
  .catch((err) => console.log(err));


// Schema for users of app
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

const User = mongoose.model('users', UserSchema);
const Post = mongoose.model('posts', PostSchema);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");

console.log("App is listening on port 5000");
app.use(express.json({ limit: '300mb' }));
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
