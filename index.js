const express = require("express");
const path = require("node:path");

const app = express();

// to handle static files
app.use(express.static(path.resolve(__dirname, "./public")));

//  middleware to check time and day
app.use((req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day > 0 && day < 6 && hour > 8 && hour < 17) {
    next();
  } else {
    res.sendFile(path.resolve(__dirname, "./unavailable.html"));
  }
});

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./Home Page.html"));
});
app.get("/contact", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./Contact Us.html"));
});
app.get("/services", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./Our Services.html"));
});

app.all("*", (req, res) => {
  console.log(__dirname);
  res.status(404).sendFile(path.resolve(__dirname, "./404.html"));
});

app.listen(3000, () => {
  "listening on port 3000...";
});
