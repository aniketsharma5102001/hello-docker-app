const express = require("express");
const app = express();

const PORT = 3000;
const API_KEY = "my-secret-key"; // simple auth

// PUBLIC API
app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "App is healthy Buddy, Don't Worry"
  });
});

// AUTH MIDDLEWARE
function authenticate(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized,Who Are You ?"
    });
  }
  next();
}

// PROTECTED API
app.get("/secure", authenticate, (req, res) => {
  res.json({
    status: "success",
    message: "You are authenticated, Welcome Bro"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
