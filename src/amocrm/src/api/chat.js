const Utils = require("../utils");

/**
 * @typedef {Object} connect
 * @property {string} account_id - The amojo ID in chat API of client's account.
 * @property {string} title - The title of chat channel.
 * @property {string|undefined} hook_api_version - The chat hook API version.
 */
/**
 * Represents a conversation object.
 * @typedef {Object} conversation
 * @property {string} conversation_id - The ID of the conversation.
 * @property {Object|undefined} source - The source of the conversation.
 * @property {string} source.external_id - The external ID of the source.
 * @property {Object} user - The user information.
 * @property {string} user.id - The integration ID of the user.
 * @property {string} user.name - The name of the user.
 * @property {string|undefined} user.ref_id - The amo ID of the user.
 * @property {string|undefined} user.avatar - The avatar of the user.
 * @property {string|undefined} user.profile_link - The profile link of the user.
 * @property {Object|undefined} user.profile - The profile information of the user.
 * @property {string} user.profile.phone - The phone number of the user.
 * @property {string} user.profile.email - The email of the user.
 */

class Chat {
    constructor(axiosConfig, axiosInstance, amojoURL, chatApiConfig) {
        this.axiosConfig = axiosConfig;
        this.axiosInstance = axiosInstance;
        this.amojoURL = amojoURL;
        this.chatApiConfig = chatApiConfig;
    }

    /**
     *  {@link connect}
     */
    async connect(params = {
        connect: {
            account_id: undefined,
            title: undefined,
            hook_api_version: undefined
        },
        rawData: undefined,
        axiosConfig: undefined
    }) {
        if (!params ||
            (!params.rawData &&
                (!params.connect ||
                    !params.connect.account_id ||
                    !params.connect.title))) {
            throw new Error("Not filled in input params");
        }

        if (!this.chatApiConfig)
            throw new Error("Fill out the chat API config")


        if (!params.connect.hook_api_version) params.connect.hook_api_version = "v2"

        const data = params.rawData || params.connect;
        const uri = `/v2/origin/custom/${this.chatApiConfig.channelId}/connect`;
        const target = this.collectHeaders("POST", uri, data);
        const config = Object.assign(target, this.axiosConfig, params.axiosConfig || {});

        const response = await this.axiosInstance.post(
            this.amojoURL + uri,
            data,
            config
        );

        const resData = response.data ?? {};

        return {
            accountId: resData.account_id,
            scopeId: resData.scope_id,
            title: resData.title,
            hookApiVersion: resData.hook_api_version
        }
    }

    async disconnect(params = {
        account_id: undefined,
        rawData: undefined,
        axiosConfig: undefined
    }) {
        if (!params || !params.account_id && !params.rawData) {
            throw new Error("Not filled in input params");
        }

        if (!this.chatApiConfig)
            throw new Error("Fill out the chat API config")

        const data = params.rawData || {
            account_id: params.account_id
        }

        const uri = `/v2/origin/custom/${this.chatApiConfig.channelId}/disconnect`;
        const target = this.collectHeaders("DELETE", uri, data);
        target.data = data;
        const config = Object.assign(target, this.axiosConfig, params.axiosConfig || {});

        await this.axiosInstance.delete(
            this.amojoURL + uri,
            config
        )
    }

    async add(params = {
        conversation: {
            conversation_id: undefined,
            source: {
                external_id: undefined,
            },
            user: {
                id: undefined,
                ref_id: undefined,
                name: undefined,
                avatar: undefined,
                profile_link: undefined,
                profile: {
                    phone: undefined,
                    email: undefined
                }
            }
        },
        scopeId: undefined,
        rawData: undefined,
        axiosConfig: undefined,
    }) {
        if (!params ||
            !params.scopeId ||
            (!params.rawData &&
                (!params.conversation ||
                    !params.conversation.conversation_id ||
                    !params.conversation.user ||
                    !params.conversation.user.id ||
                    !!params.conversation.user.name))) {
            throw new Error("Not filled in input params");
        }

        const data = params.rawData || params.conversation;
        const uri = `/v2/origin/custom/${params.scopeId}/chats`;
        const target = this.collectHeaders("POST", uri, data);
        const config = Object.assign(target, this.axiosConfig, params.axiosConfig || {});

        const response = await this.axiosInstance.post(
            this.amojoURL + uri,
            data,
            config
        )

        return response.data;
    }

    async message(params = {
        scopeId: undefined,
        payload: {
            event_type: undefined,
            timestamp: undefined,
            msec_timestamp: undefined,
            id: undefined,
            msgid: undefined,
            conversation_id: undefined,
            conversation_ref_id: undefined,
            silent: undefined,
            source: {
                external_id: undefined,
            },
            sender: {
                id: undefined,
                ref_id: undefined,
                name: undefined,
                avatar: undefined,
                profile_link: undefined,
                profile: {
                    phone: undefined,
                    email: undefined
                }
            },
            receiver: {
                id: undefined,
                ref_id: undefined,
                name: undefined,
                avatar: undefined,
                profile_link: undefined,
                profile: {
                    phone: undefined,
                    email: undefined
                }
            },
            message: {
                type: undefined,
                text: undefined,
                media: undefined,
                file_name: undefined,
                file_size: undefined,
                sticker_id: undefined,
                location: {
                    lon: undefined,
                    lat: undefined
                },
                contact: {
                    name: undefined,
                    phone: undefined,
                },
                callback_data: undefined
            },
            replyTo: {
                message: {
                    id: undefined,
                    msgid: undefined,
                    type: undefined,
                    text: undefined,
                    file_name: undefined,
                    file_size: undefined,
                    media_duration: undefined,
                    location: {
                        lon: undefined,
                        lat: undefined
                    },
                    contact: {
                        name: undefined,
                        phone: undefined,
                    },
                    timestamp: undefined,
                    msec_timestamp: undefined,
                    sender: {
                        id: undefined,
                        ref_id: undefined,
                        name: undefined
                    }
                }
            },
            forwards: {
                conversation_id: undefined,
                conversation_ref_id: undefined,
                message: {
                    id: undefined,
                    msgid: undefined,
                    type: undefined,
                    text: undefined,
                    file_name: undefined,
                    file_size: undefined,
                    media_duration: undefined,
                    location: {
                        lon: undefined,
                        lat: undefined
                    },
                    contact: {
                        name: undefined,
                        phone: undefined,
                    },
                    timestamp: undefined,
                    msec_timestamp: undefined,
                    sender: {
                        id: undefined,
                        ref_id: undefined,
                        name: undefined
                    }
                }
            },
            delivery_status: undefined
        },
        rawData: undefined,
        axiosConfig: undefined
    }) {
        if (!params ||
            !params.scopeId ||
            !params.rawData &&
            !params.payload) {
            throw new Error("Not filled in input params");
        }

        const data = params.rawData || params.payload;
        const uri = `/v2/origin/custom/${params.scopeId}`;
        const target = this.collectHeaders("POST", uri, data);
        const config = Object.assign(target, this.axiosConfig, params.axiosConfig || {});

        const response = await this.axiosInstance.post(
            this.amojoURL + uri,
            data,
            config
        )

        return response.data;
    }

    async updateMessageStatus(params = {
        scopeId: undefined,
        msgId: undefined,
        status: {
            delivery_status: undefined,
            error_code: undefined,
            error: undefined
        },
        axiosConfig: undefined,
        rawData: undefined
    }) {
        if (!params || !params.scopeId || !params.msgId || (!params.rawData && !params.status)) {
            throw new Error("Not filled in input params");
        }

        if (params.status) params.status.msgid = params.msgId;

        const data = params.rawData || params.status;
        const uri = `/v2/origin/custom/${params.scopeId}/${params.msgId}/delivery_status`;
        const target = this.collectHeaders("POST", uri, data);
        const config = Object.assign(target, this.axiosConfig, params.axiosConfig || {});

        await this.axiosInstance.post(this.amojoURL + uri, data, config)
    }

    async getHistory(params = {
        scopeId: undefined,
        conversationId: undefined,
        query: {
            offset: undefined,
            limit: undefined
        }
    }) {
        if (!params || !params.scopeId || !params.conversationId) {
            throw new Error("Not filled in input params");
        }

        const uri = `/v2/origin/custom/${params.scopeId}/${params.msgId}/delivery_status`;
        const target = this.collectHeaders("GET", uri, '');
        const config = Object.assign(target, this.axiosConfig, params.axiosConfig || {});

        if (params.query) {
            for (const queryParam in params.query) {
                config.params[queryParam] = params.query[queryParam];
            }
        }

        const response = await this.axiosInstance.get(config.links.amojoURL + uri, config);

        if (response.status !== 204) {
            return response.data.messages;
        }
    }

    async typing(params = {
        scopeId: undefined,
        typing: {
            conversation_id: undefined,
            sender: {
                id: undefined
            }
        },
        axiosConfig: undefined,
        rawData: undefined
    }) {
        if (!params || !params.scopeId || (!params.rawData && !params.typing)) {
            throw new Error("Not filled in input params");
        }

        const data = params.rawData || params.typing;
        const uri = `/v2/origin/custom/${params.scopeId}/typing`;
        const target = this.collectHeaders("POST", uri, data);
        const config = Object.assign(target, this.axiosConfig, params.axiosConfig || {});

        await this.axiosInstance.post(this.amojoURL + uri, data, config)
    }

    async reaction(params = {
        scopeId: undefined,
        reaction: {
            conversation_id: undefined,
            id: undefined,
            msgid: undefined,
            user: {
                id: undefined,
                ref_id: undefined,
            },
            type: undefined,
            emoji: undefined
        },
        axiosConfig: undefined,
        rawData: undefined
    }) {
        if (!params || !params.scopeId || (!params.rawData || !params.reaction)) {
            throw new Error("Not filled in input params");
        }

        const data = params.rawData || params.reaction;
        const uri = `/v2/origin/custom/${params.scopeId}/react`;
        const target = this.collectHeaders("POST", uri, data);
        const config = Object.assign(target, this.axiosConfig, params.axiosConfig || {});

        await this.axiosInstance.post(this.amojoURL + uri, data, config)
    }

    collectHeaders(axiosMethod, uri, data, channelSecret = undefined) {
        if (!axiosMethod || !uri || !data)
            throw new Error("Not filled in input params");

        if (!this.chatApiConfig || !this.chatApiConfig.channelSecret && !channelSecret)
            throw new Error("Fill out the chatApiConfig config")

        const date = Utils.getDateRFC2822();
        const checkSum = Utils.getContentMD5(data);
        const contentType = "application/json";

        return {
            'Date': date,
            'Content-Type': contentType,
            'Content-MD5': checkSum,
            'X-Signature': Utils.getHash({
                method: axiosMethod,
                checkSum,
                contentType,
                date,
                uri,
                secretKey: channelSecret ?? this.chatApiConfig.channelSecret
            })
        }
    }
}

module.exports = Chat;