const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    slackUsername: "Dev.Zaks",
    backend: true,
    age: 25,
    bio: "I'm Zakariyya, a fullstack engineer, trying to up by backend skills",
  });
});

app.listen("8080", () => {
  console.log("your app is litening on port " + port);
});
