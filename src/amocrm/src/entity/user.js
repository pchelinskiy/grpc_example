const BaseEntity = require("./baseEntity");

class User extends BaseEntity {
    #relativePath = "/api/v4/users";

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
            with: [],
            page: undefined,
            limit: undefined
        },
        axiosConfig: undefined
    }) {
        const response = await super.find(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        });

        if (response.status !== 204) {
            return response.data._embedded.users;
        }
    }

    async findOne(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        query: {
            with: [],
        },
        axiosConfig: undefined
    }) {
        const response = await super.findOne(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        });

        if (response.status !== 204) {
            return response.data;
        }
    }

    async add(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        entity: {
            name: undefined,
            email: undefined,
            password: undefined,
            lang: undefined,
            rights: {
                leads: undefined,
                contacts: undefined,
                companies: undefined,
                tasks: undefined,
                status_rights: undefined,
                mail_access: undefined,
                catalog_access: undefined,
                is_free: undefined,
                role_id: undefined,
                group_id: undefined,
            },
            request_id: undefined
        },
        axiosConfig: undefined,
        rawData: undefined
    }) {
        super.validateAccess(params);

        if (!params.rawData &&
            (!params.entity ||
                !params.entity.name ||
                !params.entity.email ||
                !params.entity.password)) {
            throw new Error("Not filled in request body data");
        }

        const response = await super.add(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data._embedded.users;
    }
}

module.exports = User;