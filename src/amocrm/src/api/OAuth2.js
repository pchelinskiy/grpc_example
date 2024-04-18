const Utils = require("../utils");

class OAuth2 {
    constructor(axiosConfig, axiosInstance, mainURL, widgetConfig) {
        this.axiosConfig = axiosConfig;
        this.axiosInstance = axiosInstance;
        this.mainURL = mainURL;
        this.widgetConfig = widgetConfig;
    }

    async getToken(params = {
        domain: undefined,
        code: undefined,
        refreshToken: undefined,
        axiosConfig: undefined,
        rawData: undefined
    }) {
        if (!params || !params.domain || !params.rawData && !params.code && !params.refreshToken) {
            throw new Error("Not filled in input params")
        }

        if (!this.widgetConfig && !params.rawData) {
            throw new Error("Fill out the widget config")
        }

        const data = params.rawData || Object.assign({}, this.widgetConfig);
        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});

        if (params.code) {
            data.code = params.code;
            data.grant_type = "code";
        } else if (params.refreshToken) {
            data.refresh_token = params.refreshToken;
            data.grant_type = "refresh_token";
        } else {
            throw new Error("Incoming parameters and grant type do not match");
        }

        const response = await this.axiosInstance.post(
            `https://${params.domain}/oauth2/access_token`,
            data,
            config
        );

        return {
            domain: params.domain,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            accessDeathTime: Utils.jwtParse(response.data.access_token).exp
        };
    }

    async getDomain(params ={
        accessToken: undefined,
        axiosConfig: undefined
    }) {
        if (!params.accessToken) {
            throw new Error("Not filled in input params");
        }

        const config = Object.assign({}, this.axiosConfig, params.axiosConfig || {});
        config.Authorization = `Bearer ${params.accessToken}`;

        const response = await this.axiosInstance.get(
            `${this.mainURL}/oauth2/account/subdomain`,
            config
        );

        return {
            accountId: response.data.id,
            domain: response.data.domain
        }
    }
}

module.exports = OAuth2;