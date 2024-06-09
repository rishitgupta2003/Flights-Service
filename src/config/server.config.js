const dotenv = require("dotenv");

dotenv.config(
    {
        path: '../../.env'
    }
);

const PORT = Number(process.env.PORT);

console.log(PORT);

module.exports = {
    PORT
}