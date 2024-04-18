const BaseEntity = require("./baseEntity");
const {Field, Tag, Note, Link} = require("./properties");

class Customer extends BaseEntity {}

module.exports = new Customer();