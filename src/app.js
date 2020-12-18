const Express = require("express");
const morgan = require("morgan");
const app = Express();
const hbs = require("hbs");
const path = require("path");
const cors=require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(Express.urlencoded({ extended: true }));
const corsOptions={
  origin:process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions))
// app.use(morgan("dev"));

app.use(Express.static(`${__dirname}/public`));
const viewPath = path.join(__dirname, "/../templates/views");
const partialPath = path.join(__dirname, "/../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

require(`${__dirname}/db/conn.js`);

app.get("/", (req, res) => {
  res.render("index.hbs");
});
const files = require(`${__dirname}/routes/files.js`);
const downloadPage = require(`${__dirname}/routes/downloadPage.js`);
const downloadLink = require(`${__dirname}/routes/downloadLink.js`);
app.use("/api/files", files);
app.use("/files", downloadPage);
app.use("/files/download", downloadLink);

app.listen(PORT, () => {
  console.log("sever has started");
});
