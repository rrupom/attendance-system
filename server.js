const express = require("express");
const connectDB = require("./db");
const authenticate = require("./middleware/authenticate");
const routes = require("./routes/index");

const app = express();
app.use(express.json());

app.use(routes);

app.get("/private", authenticate, (req, res) => {
  console.log("I am the user", req.user);
  return res.status(200).json({ message: "I am a private route" });
});

app.get("/public", (req, res) => {
  return res.status(200).json({ message: "I am a public route" });
});

app.use((error, req, res, next) => {
  const message = error.message ? error.message : "Server error occurred";
  const statusCode = error.statusCode ? error.statusCode : 500;
  return res.status(statusCode).json({ message });
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
