const Api = require("./src/api");
const defaults = require("./src/defaults");
const axiosInstance = require("./src/axios");
const Entity = require("./src/entity");

class AmoClient {
   constructor() {
      this.Api = new Api(defaults.axiosConfig, axiosInstance);
      this.Entity = new Entity(defaults.axiosConfig, axiosInstance);
   }
}

module.exports = new AmoClient();