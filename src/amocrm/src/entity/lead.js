const BaseEntity = require("./baseEntity");
const {Field, Tag, Note, Link} = require("./properties");

class Lead extends BaseEntity {
    #relativePath = "/api/v4/leads";

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
            return response.data._embedded.leads;
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
            price: undefined,
            status_id: undefined,
            pipeline_id: undefined,
            responsible_user_id: undefined,
            created_by: undefined,
            updated_by: undefined,
            closed_at: undefined,
            created_at: undefined,
            updated_at: undefined,
            loss_reason_id: undefined,
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
                }],
                contacts: [{
                    id: undefined,
                    is_main: undefined,
                }],
                companies: [{
                    id: undefined
                }],
                source: {
                    external_id: undefined,
                    type: undefined
                }
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

        return response.data._embedded.leads;
    }

    async update(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        entity: {
            id: undefined,
            name: undefined,
            price: undefined,
            status_id: undefined,
            pipeline_id: undefined,
            responsible_user_id: undefined,
            created_by: undefined,
            updated_by: undefined,
            closed_at: undefined,
            created_at: undefined,
            updated_at: undefined,
            loss_reason_id: undefined,
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
                }],
            }
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

        return response.data._embedded ? response.data._embedded.leads : response.data;
    }

    async complexAdd(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        entity: {
            name: undefined,
            price: undefined,
            status_id: undefined,
            pipeline_id: undefined,
            responsible_user_id: undefined,
            created_by: undefined,
            updated_by: undefined,
            closed_at: undefined,
            created_at: undefined,
            updated_at: undefined,
            loss_reason_id: undefined,
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
                }],
                contacts: [{
                    name: undefined,
                    first_name: undefined,
                    last_name: undefined,
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
                }],
                companies: [{
                    id: undefined
                }],
                metadata: [{
                    category: undefined,
                }],
                source: {
                    external_id: undefined,
                    type: undefined
                }
            }
        },
        axiosConfig: undefined,
        rawData: undefined
    }) {
        super.validateAccess(params);

        if (!params.rawData && !params.entity)
            throw new Error("Not filled in request body data");

        const response = await super.add(params, {
            relativePath: this.#relativePath + "/complex",
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data;
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
            entityName: "leads",
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
            entityName: "leads",
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
            entityName: "leads",
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance,
        }));
    }
}

module.exports = Lead;