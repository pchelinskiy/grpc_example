const BaseEntity = require("./baseEntity");

class Template extends BaseEntity {
    #relativePath = "/api/v4/chats/templates";

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
            limit: undefined,
            filter: {
                "filterKey": undefined
            },
        },
        axiosConfig: undefined
    }) {
        const response = await super.find(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        });

        if (response.status !== 204) {
            return response.data._embedded.chat_templates;
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
            content: undefined,
            is_editable: undefined,
            type: undefined,
            buttons: [{
                type: undefined,
                text: undefined,
                url: undefined,
            }],
            attachment: {
                id: undefined,
                name: undefined,
                type: undefined,
            },
            external_id: undefined,
            request_id: undefined,
            waba_footer: undefined,
            waba_category: undefined,
            waba_language: undefined,
            waba_examples: undefined,
            waba_header: undefined,
            waba_header_type: undefined,
        },
        axiosConfig: undefined,
        rawData: undefined,
    }) {
        super.validateAccess(params);

        if (!params.rawData &&
            (!params.entity ||
                !params.name ||
                !params.content)) {
            throw new Error("Not filled in request body data");
        }

        const response = await super.add(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data._embedded.chat_templates;
    }

    async update(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        entity: {
            id: undefined,
            name: undefined,
            content: undefined,
            is_editable: undefined,
            type: undefined,
            buttons: [{
                type: undefined,
                text: undefined,
                url: undefined,
            }],
            attachment: {
                id: undefined,
                name: undefined,
                type: undefined,
            },
            external_id: undefined,
            request_id: undefined,
            waba_footer: undefined,
            waba_category: undefined,
            waba_language: undefined,
            waba_examples: undefined,
            waba_header: undefined,
            waba_header_type: undefined,
        },
        axiosConfig: undefined,
        rawData: undefined,
    }) {
        super.validateAccess(params);

        if (!params.rawData &&
            (!params.entity ||
                isNaN(params.entity.id))) {
            throw new Error("Not filled in request body data");
        }

        const response = await super.update(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data._embedded ? response.data._embedded.chat_templates : response.data;
    }

    async delete(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        rawData: undefined,
        axiosConfig: undefined
    }) {
        await super.delete(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })
    }

    async review(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        axiosConfig: undefined,
    }) {
        super.validateAccess(params);

        if (isNaN(params.id))
            throw new Error("Id must be filled in and be an integer");

        const {domain, token} = params.access;

        const url = `https://${domain}` + this.relativePath + `/${params.id}/review`;
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        const data = {};
        config.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        return (await this.axiosInstance.post(url, data, config));
    }

    async reviewStatus(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        review: {
            id: undefined,
            status: undefined,
            reject_reason: undefined
        },
        axiosConfig: undefined,
        rawData: undefined,
    }) {
        super.validateAccess(params);

        if (isNaN(params.id) || isNaN(params.review.id))
            throw new Error("Id and review id must be filled in and be an integer");

        const {domain, token} = params.access;

        const url = `https://${domain}` + this.relativePath + `/${params.id}/review/${params.review.id}`;
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        const data = params.rawData || params.entity;
        config.Authorization = "Bearer " + token;

        return (await this.axiosInstance.post(url, data, config));
    }
}

module.exports = Template;