const OAuth2 = require("./OAuth2");
const Chat = require("./chat");

class Api {
    constructor(axiosConfig, axiosInstance) {
        this.OAuth2 = new OAuth2(axiosConfig, axiosInstance);
        this.Chat = new Chat(axiosConfig, axiosInstance);
    }
}

module.exports = Api;