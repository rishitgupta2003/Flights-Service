const { StatusCodes } = require("http-status-codes");
const serverConfig = require("./config");
const express = require("express");

const app = express();

app.listen(serverConfig.PORT, () => {
    console.log(`APP RUNNING ON PORT -> ${serverConfig.PORT}`);
});

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json(
        {
            "msg" : "Working"
        }
    );
});