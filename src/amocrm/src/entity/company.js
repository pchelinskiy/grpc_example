const BaseEntity = require("./baseEntity");
const {Field, Tag, Note, Link} = require("./properties");

class Company extends BaseEntity {
    #relativePath = "/api/v4/companies";

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
            query: undefined,
            filter: {
                "filterKey": undefined
            },
            order: {
                "orderKey": undefined
            }
        },
        axiosConfig: undefined
    }) {
        const response = await super.find(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        });

        if (response.status !== 204) {
            return response.data._embedded.companies;
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
            responsible_user_id: undefined,
            created_by: undefined,
            updated_by: undefined,
            created_at: undefined,
            updated_at: undefined,
            custom_fields_values: [{
                field_code: undefined,
                values: [{
                    value: undefined,
                }]
            }],
            tags_to_add: [{
                id: undefined,
                name: undefined,
            }],
            _embedded: {
                tags: [{
                    id: undefined,
                    name: undefined
                }]
            },
            request_id: undefined
        },
        axiosConfig: undefined,
        rawData: undefined
    }) {
        super.validateAccess(params);

        if (!params.rawData && !params.entity)
            throw new Error("Not filled in request body data");

        const response = await super.add(params, {
            relativePath: this.#relativePath,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data._embedded.companies;
    }

    async update(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        entity: {
            id: undefined,
            name: undefined,
            responsible_user_id: undefined,
            created_by: undefined,
            updated_by: undefined,
            created_at: undefined,
            updated_at: undefined,
            custom_fields_values: [{
                field_code: undefined,
                values: [{
                    value: undefined,
                }]
            }],
            tags_to_add: [{
                id: undefined,
                name: undefined,
            }],
            tags_to_delete: [{
                id: undefined,
                name: undefined,
            }],
            _embedded: {
                tags: [{
                    id: undefined,
                    name: undefined
                }]
            },
        },
        axiosConfig: undefined,
        rawData: undefined
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

        return response.data._embedded ? response.data._embedded.companies : response.data;
    }

    async linkFind(params = {
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
        return (await Link.find(params, {
            entityName: "companies",
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance,
        }));
    }

    async linkEntity(params = {
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
        return (await Link.link(params, {
            entityName: "companies",
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance,
        }));
    }

    async unlinkEntity(params =  {
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
        return (await Link.unlink(params, {
            entityName: "companies",
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance,
        }));
    }
}

module.exports = Company;