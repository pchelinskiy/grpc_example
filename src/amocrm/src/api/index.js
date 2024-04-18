const OAuth2= require("./OAuth2");
const Chat = require("./chat");
const Utils = require("../utils");

class Api {
    constructor(axiosConfig, axiosInstance, urls, optional= {}) {
        if (optional.widgetConfig && Utils.checkKeys(optional.widgetConfig, {
            client_id: "string",
            client_secret: "string",
            redirect_uri: "string"
        })) {
            this.OAuth2 = new OAuth2(axiosConfig, axiosInstance, urls.mainURL, optional.widgetConfig);
        }
        if (optional.chatApiConfig && Utils.checkKeys(optional.chatApiConfig, {
            channelId: "string",
            channelSecret: "string"
        })) {
            this.Chat = new Chat(axiosConfig, axiosInstance, urls.amojoURL, optional.chatApiConfig);
        }
    }
}

module.exports = Api;