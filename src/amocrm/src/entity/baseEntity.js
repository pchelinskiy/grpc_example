const BaseClass = require("../baseClass");
const e = require("express");

class BaseEntity extends BaseClass {
    constructor() {
        super();
        if (this.constructor === BaseEntity) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    async find(params){
        super.validateAccess(params);

        const environment = arguments[1];

        if (!environment) return

        const {domain, token} = params.access;

        const url = `https://${domain}` + environment.relativePath;
        const config = Object.assign({}, environment.axiosConfig, params.axiosConfig || {});
        config.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        return (await environment.axiosInstance.get(url, config));
    }
    async findOne(params){
        super.validateAccess(params);

        if (isNaN(params.id))
            throw new Error("Id must be filled in and be an integer");

        const environment = arguments[1];

        if (!environment) return

        const {domain, token} = params.access;

        const url = `https://${domain}` + environment.relativePath + `${params.id}`;
        const config = Object.assign({}, environment.axiosConfig, params.axiosConfig || {});
        config.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        return (await environment.axiosInstance.get(url, config));
    }
    async add(params) {
        const environment = arguments[1];

        if (!environment) return

        const {domain, token} = params.access;

        const url = `https://${domain}` + environment.relativePath;
        const config = Object.assign({}, environment.axiosConfig, params.axiosConfig || {});
        const data = params.rawData || [params.entity];
        config.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        return (await environment.axiosInstance.post(url, data, config));
    }
    async update(params){
        const environment = arguments[1];

        if (!environment) return;

        const {domain, token} = params.access;
        const id = params.entity && params.entity.id ? `/${params.entity.id}` : '';
        const url = `https://${domain}` + environment.relativePath + id;
        const config = Object.assign({}, environment.axiosConfig, params.axiosConfig || {});
        const data = params.rawData || params.entity;
        config.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        return (await environment.axiosInstance.patch(url, data, config));
    }
    async delete(params) {
        super.validateAccess(params);

        if (!params.rawData && isNaN(params.id))
            throw new Error("Not filled in request body data");

        const environment = arguments[1];

        if (!environment) return;

        const {domain, token} = params.access;
        const config = Object.assign({}, environment.axiosConfig, params.axiosConfig || {});
        let id = "";

        if (params.id) id += `/${params.id}`
        else config.data = params.rawData;

        const url = `https://${domain}` + environment.relativePath + id;
        config.Authorization = "Bearer " + token;

        super.fillHttpQueryParams(params.query, config);

        await environment.axiosInstance.delete(url, config);
    }
}

module.exports = BaseEntity;