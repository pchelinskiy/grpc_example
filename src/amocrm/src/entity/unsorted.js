const BaseEntity = require("./baseEntity");

/**
 * @typedef {Object} sip
 * @property {string} phone
 * @property {string|int|undefined} call_responsible
 * @property {int} called_at
 * @property {int} duration
 * @property {string} link
 * @property {string} service_code
 * @property {boolean} is_call_event_needed
 * @property {string} uniq
 *
 * @typedef {Object} forms
 * @property {string} form_id
 * @property {string} form_name
 * @property {string} form_page
 * @property {string} ip
 * @property {int} form_sent_at
 * @property {string} referer
 *
 * @typedef {Object} chat
 * @property {string} from
 * @property {string} to
 * @property {int} received_at
 * @property {string} service
 * @property {Object} client
 * @property {string} client.name
 * @property {string|undefined} client.avatar
 * @property {Object} origin
 * @property {string} origin.chat_id
 * @property {string|undefined} origin.ref
 * @property {string|undefined} origin.visitor_uid
 * @property {string|undefined} last_message_text
 * @property {string} source_name
 *
 * @typedef {Object} mail
 * @property {Object} from
 * @property {string} from.email
 * @property {string} from.name
 * @property {int} received_at
 * @property {string} subject
 * @property {int} thread_id
 * @property {int} message_id
 * @property {string} content_summary
 *
 * @typedef {sip|forms|chat|mail} metadata
 * */

class Unsorted extends BaseEntity {
    #relativePath = "/api/v4/leads/unsorted";

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
            return response.data._embedded.unsorted;
        }
    }

    async findOne(params = {
        access: {
            domain: undefined,
            token: undefined
        },
        uid: undefined,
        query: {
            with: [],
        },
        axiosConfig: undefined
    }){
        if (!params.uid) throw new Error("Uid must be filled in")

        const response = await super.find(params, {
            relativePath: this.#relativePath + `/${params.uid}`,
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
        category: undefined,
        entity: {
            source_uid: undefined,
            source_name: undefined,
            pipeline_id: undefined,
            created_at: undefined,
            metadata: undefined, /**{@link metadata}*/
            _embedded: {
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
                }],
                leads: [{
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
                    }}]
            },
            request_id: undefined,
        },
        axiosConfig: undefined,
        rawData: undefined,
    }){
        super.validateAccess(params);

        if (!["sip", "forms", "chat", "mail"].includes(params.category))
            throw new Error("Invalid category type")

        if (!params.rawData && !params.entity)
            throw new Error("Not filled in request body data");

        const response = await super.add(params, {
            relativePath: this.#relativePath + `/${params.category}`,
            axiosConfig: this.axiosConfig,
            axiosInstance: this.axiosInstance
        })

        return response.data._embedded.unsorted;
    }

    async accept(params = {
        access: {
            domain: undefined,
            token: undefined,
        },
        uid: undefined,
        additional: {
            user_id: undefined,
            status_id: undefined,
        },
        axiosConfig: undefined,
        rawData: undefined,
    }) {
        super.validateAccess(params);

        if (!params.uid) throw new Error("Fill in the uid");

        const {domain, token} = params.access;

        const url = `https://${domain}` + this.#relativePath + `/${params.uid}/accept`;
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        const data = params.rawData || params.additional;
        config.Authorization = "Bearer " + token;

        return (await this.axiosInstance.post(url, data, config));
    }

    async decline(params = {
        access: {
            domain: undefined,
            token: undefined,
        },
        uid: undefined,
        additional: {
            user_id: undefined,
        },
        axiosConfig: undefined,
        rawData: undefined,
    }){
        super.validateAccess(params);

        if (!params.uid) throw new Error("Fill in the uid");

        const {domain, token} = params.access;

        const url = `https://${domain}` + this.#relativePath + `/${params.uid}/decline`;
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        const data = params.rawData || params.additional;
        config.Authorization = "Bearer " + token;

        return (await this.axiosInstance.delete(url, data, config));
    }
}

module.exports = Unsorted;