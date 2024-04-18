const Source = require("./source");
const Contact = require("./contact");
const Company = require("./company");
const Account = require("./account");
const User = require("./user");
const Pipeline = require("./pipeline");
const Unsorted = require("./unsorted");

class Entity {
    constructor(axiosConfig, axiosInstance) {
        this.Account = new Account(axiosConfig, axiosInstance);
        this.Source = new Source(axiosConfig, axiosInstance);
        this.Contact = new Contact(axiosConfig, axiosInstance);
        this.Company = new Company(axiosConfig, axiosInstance);
        this.User = new User(axiosConfig, axiosInstance);
        this.Pipeline = new Pipeline(axiosConfig, axiosInstance);
        this.Unsorted = new Unsorted(axiosConfig, axiosInstance);
    }
}

module.exports = Entity;