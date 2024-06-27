const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./routes/index");
const database = require("./config/database");
const createError = require('http-errors')
const compression = require("compression");
const helmet = require("helmet");

const app = express();
require("dotenv").config();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const PORT = 5000 

async function init() {
  try {
    await database.sequelize.authenticate();
    console.log("Connected to Mysql!");

    app.use(compression());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use("/", route);

    //http Error Handling Methods
    app.use(async (req, res, next) => {
      next(createError.NotFound())
    })

    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.send({
        error: {
          status: err.status || 500,
          message: err.message
        }
      })
    })
    app.listen(PORT, function () {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}
init();