const BaseEntity = require("./baseEntity");

class Pipeline extends BaseEntity {
    #relativePath = "/api/v4/leads/pipelines";

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
        axiosConfig: undefined
    }) {
        const response = await super.find(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        });

        if (response.status !== 204) {
            return response.data._embedded.pipelines;
        }
    }

    async findOne(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
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
            sort: undefined,
            is_main: undefined,
            is_unsorted_on: undefined,
            _embedded: {
                statuses: [],
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
                !params.entity.sort ||
                !params.entity.is_main ||
                !params.entity.is_unsorted_on)) {
            throw new Error("Not filled in request body data");
        }

        const response = await super.add(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data._embedded.pipelines;
    }

    async update(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        entity: {
            name: undefined,
            sort: undefined,
            is_main: undefined,
            is_unsorted_on: undefined,
        },
        axiosConfig: undefined,
        rawData: undefined
    }) {
        super.validateAccess(params);

        if (isNaN(params.id))
            throw new Error("Id must be filled in and be an integer");

        if (!params.rawData &&
            !params.entity) {
            throw new Error("Not filled in request body data");
        }

        params.entity.id = params.id;

        const response = await super.update(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data._embedded ? response.data._embedded.pipelines : response.data;
    }

    async delete(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        axiosConfig: undefined
    }) {
        await super.delete(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })
    }

    async statusFind(params = {
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
        super.validateAccess(params);

        if (isNaN(params.id))
            throw new Error("Id must be filled in and be an integer");

        const {domain, token} = params.access;

        const url = `https://${domain}` + this.#relativePath + `/${params.id}/statuses`;
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        config.headers.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        const response = await this.axiosInstance.get(url, config);

        if (response.status !== 204)
            return response.data._embedded.statuses;
    }

    async statusFindOne(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        statusId: undefined,
        query: {
            with: [],
            descriptions: undefined,
        },
        axiosConfig: undefined
    }) {
        super.validateAccess(params);

        if (isNaN(params.id) || isNaN(params.statusId))
            throw new Error("Id must be filled in and be an integer");

        const {domain, token} = params.access;

        const url = `https://${domain}` + this.#relativePath + `/${params.id}/statuses/${params.statusId}`;
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        config.headers.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        const response = await this.axiosInstance.get(url, config);

        if (response.status !== 204)
            return response.data;
    }

    async statusAdd(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        status: {
            name: undefined,
            sort: undefined,
            color: undefined,
            request_id: undefined,
            descriptions: [{
                level: undefined,
                description: undefined
            }]
        },
        axiosConfig: undefined,
        rawData: undefined,
    }) {
        super.validateAccess(params);

        if (isNaN(params.id))
            throw new Error("Id must be filled in and be an integer");

        if (!params.rawData && (!params.status || !params.status.name || !params.status.sort))
            throw new Error("Not filled in request body data");

        const {domain, token} = params.access;

        const url = `https://${domain}` + this.#relativePath + `/${params.id}/statuses`;
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        const data = params.rawData || [params.status];
        config.headers.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        const response = await this.axiosInstance.post(url, data, config);

        if (response.status !== 204)
            return response.data._embedded.statuses;
    }

    async statusUpdate(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        statusId: undefined,
        status: {
            name: undefined,
            sort: undefined,
            color: undefined,
            request_id: undefined,
            descriptions: [{
                level: undefined,
                description: undefined
            }]
        },
        axiosConfig: undefined,
        rawData: undefined,
    }){
        super.validateAccess(params);

        if (isNaN(params.id))
            throw new Error("Id must be filled in and be an integer");

        if (!params.rawData && !params.status)
            throw new Error("Not filled in request body data");

        const {domain, token} = params.access;

        const url = `https://${domain}` + this.#relativePath + `/${params.id}/statuses/${params.statusId}`;
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        const data = params.rawData || [params.status];
        config.headers.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        const response = await this.axiosInstance.patch(url, data, config);

        if (response.status !== 204)
            return response.data;
    }

    async statusDelete(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        statusId: undefined,
        axiosConfig: undefined,
        rawData: undefined,
    }) {
        super.validateAccess(params);

        if (isNaN(params.id) || isNaN(params.statusId))
            throw new Error("Id must be filled in and be an integer");

        const {domain, token} = params.access;

        const url = `https://${domain}` + this.#relativePath + `/${params.id}/statuses/${params.statusId}`;
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        config.headers.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        await this.axiosInstance.delete(url, config);
    }
}

module.exports = Pipeline;