const BaseProperty = require("./baseProperty");

class Link extends BaseProperty {
    async find(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        query: {
            filter: {
                "filterKey": undefined
            }
        },
        axiosConfig: undefined,
    }) {
        super.validateAccess(params);

        const environment = arguments[1];

        if (!environment) return;

        const {domain, token} = params.access;
        const id = params.id ? `${params.id}/` : "";
        const url = `https://${domain}/api/v4/${environment.entityName}/${id}links`;
        const config = Object.assign({}, environment.axiosConfig, params.axiosConfig || {});
        config.headers.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        const response = await environment.axiosInstance.get(url, config);

        return response.data._embedded.links;
    }

    async link(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        link: {
            to_entity_id: undefined,
            to_entity_type: undefined,
            metadata: {
                catalog_id: undefined,
                quantity: undefined,
                is_main: undefined,
                updated_by: undefined,
                price_id: undefined
            },
        },
        axiosConfig: undefined,
        rawData: undefined
    }) {
        super.validateAccess(params);

        if (!params.rawData && !(params.id && params.link))
            throw new Error("Not filled in request body data");

        const environment = arguments[1];

        if (!environment) return;

        const {domain, token} = params.access;
        const id = params.id ? `${params.id}/` : "";
        const url = `https://${domain}/api/v4/${environment.entityName}/${id}link`;
        const config = Object.assign({}, environment.axiosConfig, params.axiosConfig || {});
        config.headers.Authorization = "Bearer " + token;
        const data = params.rawData || [params.link];

        const response = await environment.axiosInstance.post(url, data, config);

        return response.data._embedded.links;
    }

    async unlink(params =  {
        access: {
            domain: undefined,
            token: undefined
        },
        id: undefined,
        unlink: {
            to_entity_id: undefined,
            to_entity_type: undefined,
            metadata: {
                catalog_id: undefined,
                updated_by: undefined,
            },
        },
        axiosConfig: undefined,
        rawData: undefined
    }) {
        super.validateAccess(params);

        if (!params.rawData && !(params.id && params.unlink))
            throw new Error("Not filled in request body data");

        const environment = arguments[1];

        if (!environment) return;

        const {domain, token} = params.access;
        const id = params.id ? `${params.id}/` : "";
        const url = `https://${domain}/api/v4/${environment.entityName}/${id}unlink`;
        const config = Object.assign({}, environment.axiosConfig, params.axiosConfig || {});
        config.headers.Authorization = "Bearer " + token;
        const data = params.rawData || [params.unlink];

        await environment.axiosInstance.post(url, data, config);
    }
}

module.exports = new Link();