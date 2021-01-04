import express from "express";

const app = express();

app.get("/", (req, res) => {
  return "Server start";
});
app.listen(5000, () => {
  console.log("started");
});
