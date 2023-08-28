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
/* ##### BRING IN THE DOTENV ##### */
import dotenv from "dotenv";
/* ##### BRING IN REGISTRATIONS FACTORY FUNCTION ##### */
import RegNumbers from "./RegistrationNumbers.js";
/* ##### BRING IN THE DATABASE ##### */
import db from "./database.js";
/* ##### BRING IN REGISTRATIONS ROUTE ##### */
import routesFunctions from "./routes/registrationsRoute.js";
/* ##### BRING IN DATABASE FACTORY FUNCTION ##### */
import dbFunctions from "./Registrationsdb.js";

/* CONFIGURE THE ENVIROMENT VARIABLE FILE */
dotenv.config();
/* -------------------- ALL INSTANCES -------------------- */
/* INITIALIZE EXPRESS */
const app = express();
/* INITIALIZE FACTORY FUNCTION */
const factoryFunc = RegNumbers();
/* INITIALIZE DATABASE FACTORY FUNCTION */
const dbFunc = dbFunctions(db);
/* -------------------- ALL INSTANCES -------------------- */

const registrationsRoute = routesFunctions(factoryFunc, dbFunc);

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
app.post("/reset", registrationsRoute.reset);
/* -------------------- ALL ROUTES -------------------- */

// CREATE PORT VARIABLE
const PORT = process.env.PORT || 3001;
// GET NOTIFICATION WHEN APP SUCCESSFULLY STARTS
app.listen(PORT, function () {
  console.log(`app started on port: ${PORT}`);
});
