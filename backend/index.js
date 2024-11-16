const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("./config/db");
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./middleware/passport-google-strategy");
require("./middleware/passport-jwt-strategy");
const cors = require("cors");
const { chatSockets } = require("./middleware/chatSockets");
const path = require("path");

// for routes to accept the json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    name: "chatApp",
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
    store: new MongoStore(
      {
        mongoUrl: process.env.MONGO_URI,
      },
      {
        mongooseConnection: dbConnection,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || `successfully added mongostore `);
      }
    ),
  })
);

const corsOptions = {
  origin: [process.env.FRONTEND_URL], // Allow specific origin from environment variable
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
  exposedHeaders: ["Content-Disposition", "Content-Type"],
  allowedHeaders: ["Authorization", "Content-Type"], // Explicitly allow Authorization header
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware
app.use(cors(corsOptions));


//for using passport
app.use(passport.initialize());
app.use(passport.session());


dbConnection();

app.use("/apis/v1",require("./routes"));


const server = app.listen(port,() => {
    console.log("Server is running on the port",port);
})

chatSockets(server);

/*---------------------DEPLOYMENT-----------------------*/

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running on development");
  });
}

/*---------------------DEPLOYMENT-----------------------*/
