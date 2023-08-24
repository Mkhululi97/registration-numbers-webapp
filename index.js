/* ##### BRING IN EXPRESS ##### */
import express from "express";
/* ##### BRING IN HANDLEBARS ##### */
import { engine } from "express-handlebars";
/* ##### BRING IN BOBYPARSER ##### */
import bodyParser from "body-parser";
/* ##### BRING IN EXPRESS-FLASH ##### */
import flash from "express-flash";
/* ##### BRING IN EXPRESS-SESSION ##### */
import session from "express-session";
/* ##### BRING IN REGISTRATIONS FACTORY FUNCTION ##### */
import RegNumbers from "./RegistrationNumbers.js";
/* ##### BRING IN REGISTRATIONS ROUTE ##### */
import routesFunctions from "./routes/registrationsRoute.js";

/* -------------------- ALL INSTANCES -------------------- */
/* INITIALIZE EXPRESS */
const app = express();
/* INITIALIZE FACTORY FUNCTION */
const factoryFunc = RegNumbers();
/* -------------------- ALL INSTANCES -------------------- */

const registrationsRoute = routesFunctions(factoryFunc);

/* -------------------- SETUP ENGINE -------------------- */
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

/* -------------------- GET ACCESS TO OUR STATIC FILES -------------------- */
app.use(express.static("public"));

/* -------------------- USE BODY PARSER -------------------- */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/* -------------------- USE BODY PARSER -------------------- */

/* -------------------- USE SESSION MIDDLEWARE -------------------- */
app.use(
  session({
    secret: "codermkhululi",
    resave: true,
    saveUninitialized: true,
  })
);

/* -------------------- USE FLASH MIDDLEWARE -------------------- */
app.use(flash());
/* -------------------- ALL ROUTES -------------------- */
//CREATE HOME OR DEFAULT ROUTE
app.get("/", registrationsRoute.home);
app.post("/reg_numbers", registrationsRoute.registrations);
/* -------------------- ALL ROUTES -------------------- */

/* ++++++++++++++++++++ CODE FROM ELEPHANT SQL ++++++++++++++++++++ */
import pg from "pg";
const conString = process.env.PGDATABASE_URL;
const client = new pg.Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("database connected");
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});
/* ++++++++++++++++++++ CODE FROM ELEPHANT SQL ++++++++++++++++++++ */

// CREATE PORT VARIABLE
const PORT = process.env.PORT || 3001;
// GET NOTIFICATION WHEN APP SUCCESSFULLY STARTS
app.listen(PORT, function () {
  console.log(`app started on port: ${PORT}`);
});
