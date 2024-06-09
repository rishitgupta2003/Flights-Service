const { StatusCodes } = require("http-status-codes");
const { ServerConfig, Logger } = require("./config");
const express = require("express");
const apiRoute = require("./routes");

const app = express();

app.use('/api', apiRoute);

app.listen(ServerConfig.PORT, () => {
    console.log(`APP RUNNING ON PORT -> ${ServerConfig.PORT}`);
    Logger.info( "Successfully Started Server",{} );
});

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json(
        {
            "msg" : "Working"
        }
    );
});