require("dotenv").config();
PORT = process.env.PORT||4000;
const cors = require("cors");
const express = require("express");
const app = express();


const session = require("express-session");
const TWO_HOURS = 1000 * 60 * 60 * 2;

const mongoose = require("mongoose");

const MongoStore = require('connect-mongo')(session);
mongoose.connect(process.env.DATABASE_URL_ALAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
mongoose.set("useCreateIndex", true);
db.on("error", (error) => console.log(error));

db.once("open", () => console.log("Connected to database"));

app.use(cors({credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const {

  NODE_ENV = "development",

  SESS_NAVE = "sid",
  SESS_SECRET = "ssh!quiet,it'asecret!",
  SESS_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === "Production";

app.set('trust proxy',1)

app.use(
  session({
    secret: 'keyboard cat',
  name: process.env.SESSION_NAME,
  resave:true,
  rolling:true,
  saveUninitialized:false,
    store:new MongoStore ({mongooseConnection: db}),
    cookie: {
      maxAge: TWO_HOURS,
    sameSite: "none",
    secure:false,
    httpOnly: true
    },
  })
);


app.use('*/admin*', (req, res , next) => {

if (!req.session.userId){
  return res.status(401).json({message: 'du har ikke adgang'})
}
next();
} )


const re = require("./routes/gaader.routes");
app.use("/gaader", re);

const ra = require("./routes/bruger.routes");
app.use("/admin/b", ra);

const Auth = require("./routes/auth.routes");
app.use("/auth", Auth);

app.listen(PORT, function () {
  console.log("server start <3" + " server er ok :))");
});
