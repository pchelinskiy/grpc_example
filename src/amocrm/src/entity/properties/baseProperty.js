const BaseClass = require("../../baseClass");

class BaseProperty extends BaseClass {
    constructor() {
        super();
        if (this.constructor === BaseProperty) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
}

module.exports = BaseProperty;