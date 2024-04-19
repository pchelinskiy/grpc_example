const BaseEntity = require("./baseEntity");

class Account extends BaseEntity {
    #relativePath = "/api/v4/account";

    constructor(axiosConfig, axiosInstance) {
        super();
        this.axiosConfig = axiosConfig;
        this.axiosInstance = axiosInstance;
    }

    async find(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        query: {
            with: []
        }
    }) {
        console.log(this)
        const response = await super.find(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        });

        if (response.status !== 204)
            return response.data
    }
}

module.exports = Account;