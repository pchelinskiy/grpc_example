require('dotenv').config();

module.exports = ({
    PORT: process.env.PORT,
    REQUEST_TIMEOUT: Number(process.env.REQUEST_TIMEOUT),
})