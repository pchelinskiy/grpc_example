const BaseEntity = require("./baseEntity");

/**
 * Represents a source with various properties.
 *
 * @typedef {Object} source
 * @property {number} id - The id of the source
 * @property {string} name - The name of the source.
 * @property {string} external_id - The external identifier of the source.
 * @property {number|undefined} pipeline_id - The pipeline identifier of the source.
 * @property {boolean|undefined} default - Indicates if the source is the default.
 * @property {string|undefined} origin_code - The origin code of the source.
 * @property {Array|undefined} services - An array of services associated with the source.
 * @property {string} services.type - The type of the service. (The only supported type is whatsapp)
 * @property {Object|undefined} services.params - Parameters related to the service.
 * @property {string|undefined} services.params.waba - The WABA (WhatsApp Business Account) related to the service.
 * @property {boolean|undefined} services.params.is_supports_list_message - Indicates if the service supports list messages.
 * @property {Array|undefined} services.pages - An array of pages associated with the service.
 * @property {string} services.pages.name - The name of the page.
 * @property {string} services.pages.id - The identifier of the page.
 * @property {string} services.pages.link - The link associated with the page.
 */

class Source extends BaseEntity {
    #relativePath = "/api/v4/sources";

    constructor(axiosConfig, axiosInstance) {
        super();
        this.axiosConfig = axiosConfig;
        this.axiosInstance = axiosInstance;
    }

    /**
     *  Object of source - {@link source}
     */
    async find(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        query: {
            external_id: undefined,
        },
        axiosConfig: undefined
    }) {
        const response = await super.find(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        });

        if (response.status !== 204) {
            return response.data._embedded.sources;
        }
    }

    /**
     *  Object of source - {@link source}
     */
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

    /**
     *  Object of source - {@link source}
     *
     *  To add multiple sources, create an array of {@link source} objects and pass it to rawData
     */
    async add(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        entity: {
            name: undefined,
            external_id: undefined,
            pipeline_id: undefined,
            default: undefined,
            origin_code: undefined,
            services: [{
                type: undefined,
                params: {waba: undefined, is_supports_list_message: undefined},
                pages: [{name: undefined, id: undefined, link: undefined}]
            }]
        },
        rawData: undefined,
        axiosConfig: undefined
    }) {
        super.validateAccess(params);

        if (!params.rawData &&
            (!params.entity ||
                !params.entity.name ||
                !params.entity.external_id)) {
            throw new Error("Not filled in request body data");
        }

        const response = await super.add(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data._embedded.sources;
    }

    /**
     *  Object of source - {@link source}
     *
     *  To update multiple sources, create an array of {@link source} objects and pass it to rawData
     *  </br>{@link external_id} cannot be changed
     * */
    async update(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        entity: {
            id: undefined,
            name: undefined,
            pipeline_id: undefined,
            default: undefined,
            origin_code: undefined,
            services: [{
                type: undefined,
                params: {waba: undefined, is_supports_list_message: undefined},
                pages: [{name: undefined, id: undefined, link: undefined}]
            }]
        },
        rawData: undefined,
        axiosConfig: undefined
    }) {
        super.validateAccess(params);

        if (!params.rawData &&
            (!params.entity ||
                !params.entity.name ||
                isNaN(params.entity.id))) {
            throw new Error("Not filled in request body data");
        }

        const response = await super.update(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data._embedded ? response.data._embedded.sources : response.data;
    }

    /**
     *  To delete multiple sources, create an array of {id: number} objects and pass it to rawData
     * */
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
}

module.exports = Source;