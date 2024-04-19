const config = require("../../config");

const defaults = {
    axiosConfig: {
        headers: {
            'Content-Type':
                'application/json',
        },
        timeout: config.REQUEST_TIMEOUT,
    }
};

module.exports = defaults;