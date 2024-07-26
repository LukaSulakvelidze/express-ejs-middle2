const express = require("express");
const app = express();
const apiRouter = require("./expencesRouter/expencesRoute");
const path = require("path");
app.use(express.json());
app.use("/expences", apiRouter);
app.get("/", (_, res) => {
  res.render(path.join(__dirname, "/", "pages/home.ejs"));
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
