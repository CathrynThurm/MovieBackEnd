if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

/*const corsEnabledRouter = require("./cors-enabled/cors-enabled.router")
const corsNotEnabledRouter = require("./cors-not-enabled/cors-not-enabled.router")*/
const notFound = require("./errors/errorHandler");
const errorHandler = require("./errors/errorHandler")

app.use(cors());
app.use(express.json());

/*app.use("/cors-enabled", corsEnabledRouter)
app.use("/cors-not-enabled", corsNotEnabledRouter);*/

app.use(notFound)
app.use(errorHandler)

module.exports = app;
