const {parseJwt} = require("@sineverba/jwt-decoder");
const MD5 = require("md5");
const crypto = require("crypto");

class Utils {
    static jwtParse(token) {
        if (token) {
            return parseJwt(token);
        }
    }

    static getDateRFC2822() {
        return new Date().toUTCString().replace('GMT', '+0000');
    }

    static getContentMD5(jsonObj) {
        if (typeof jsonObj !== "string") jsonObj = JSON.stringify(jsonObj);
        return MD5(jsonObj)
    }

    static getHash(params = {
        method: undefined,
        checkSum: undefined,
        contentType: undefined,
        date: undefined,
        uri: undefined,
        secretKey: undefined
    }) {
        if (!params ||
            !params.method ||
            !params.checkSum ||
            !params.contentType ||
            !params.date ||
            !params.uri ||
            !params.secretKey) {
            throw new Error("Not filled in input params");
        }

        const str = [
            params.method,
            params.checkSum,
            params.contentType,
            params.date,
            params.uri
        ].join('\n');

        return crypto.createHmac("sha1", params.secretKey).update(str).digest('hex');
    }
}

module.exports = Utils