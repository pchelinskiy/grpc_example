const defaults = require("./defaults");
const axios = require("axios");
const Api = require("./api");
const Entity = require("./entity");

/**
 * Documentation for the configuration object.
 *
 * @typedef {Object|undefined} ConfigObject
 * @property {Object|undefined} widgetConfig - Configuration object for widgets
 * @property {string} widgetConfig.client_id - The client ID for widgets
 * @property {string} widgetConfig.client_secret - The client secret for widgets
 * @property {string} widgetConfig.redirect_uri - The redirect URI for widgets
 * @property {Object|undefined} axiosConfig - Configuration object for axios
 * @property {Object|undefined} chatApiConfig - Configuration object for chat API
 * @property {string} chatApiConfig.channelId - The channel ID for chat API
 * @property {string} chatApiConfig.channelSecret - The secret for chat API
 * @property {axios|undefined} axiosInstance - user instance of axios
 * @property {Object|undefined} urls - Configuration object for urls
 * @property {string|undefined} urls.mainURL - main URL of amoCRM
 * @property {string|undefined} urls.amojoURL - amojo URL of amoCRM
 */
class AmoClient {
    constructor(optional) {
        optional = optional ? optional : {};
        this.axiosConfig = optional.axiosConfig ? optional.axiosConfig : defaults.axiosConfig;
        this.urls = Object.assign({}, defaults.urls, optional.urls || {});
        this.axiosInstance = optional.axiosInstance ? optional.axiosInstance : axios;
        this.chatApiConfig = optional.chatApiConfig;
        this.Api = new Api(this.axiosConfig, this.axiosInstance, this.urls, optional);
        this.Entity = new Entity(this.axiosConfig, this.axiosInstance);
    }
}

module.exports = AmoClient