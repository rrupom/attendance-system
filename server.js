const express = require("express");
const bcrypt = require("bcryptjs");
const connectDB = require("./db");
const User = require("./models/User");

const app = express();
app.use(express.json());

app.post("/register", async (req, res, next) => {
  /**
   * Request Input Sources
   - req body
   - req params
   - req query
   - req Header
   - req cookies
   */

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hash });
    await user.save();

    return res.status(201).json({ message: "Successfully created", user });
  } catch (error) {
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    delete user._doc.password;
    delete user._doc._id;

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  return res.status(500).json({ message: "Server error occured" });
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    app.listen(4000, () => {
      console.log("App listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
