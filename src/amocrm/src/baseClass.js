class BaseClass {
    constructor() {
        if (this.constructor === BaseClass) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    validateAccess(params){
        if (!params)
            throw new Error("Not filled in input params");

        if (!params.access || !params.access.domain || !params.access.token)
            throw new Error("Not filled in access data")
    }

    fillHttpQueryParams(queryParams, config) {
        if (!queryParams || typeof queryParams !== "object" || Array.isArray(queryParams))
            return

        config.params = {};

        for (const key in queryParams) {
            switch (key) {
                case "filter":
                case "order":
                    for (const keyElem in key) {
                        if ((Array.isArray(key[keyElem]))) {
                            for (const [index, value] of key[keyElem].entries()) {
                                config.params[`${key}[${keyElem}][${index}]`] = value
                            }
                        } else {
                            config.params[`${key}[${keyElem}]`] = key[keyElem];
                        }
                    }
                    break;
                case "with":
                    if (Array.isArray(queryParams[key]))
                        config.params[key] = queryParams[key].join(',');
                    else
                        config.params[key] = queryParams[key];
                    break;
                default:
                    config.params[key] = queryParams[key];
                    break;
            }
        }
    }
}

module.exports = BaseClass;