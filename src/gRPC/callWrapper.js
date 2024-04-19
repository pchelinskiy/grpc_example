const {AxiosError} = require("axios")

const CustomError = require('../amocrm/src/customError');
const {StatusCodes} = require('http-status-codes');

async function call(call, callback, object) {
    try {
        const response = await object.instance[object.method](call.request) ?? {};

        console.log(response)

        callback(null, response);
    } catch (error) {
        const gRPCErrorObject = {
            code: 500,
            message: "INTERNAL_SERVER_ERROR"
        };

        if (error instanceof CustomError) {
            gRPCErrorObject.code = error.code;
            gRPCErrorObject.message = error.message;
        } else if (error instanceof AxiosError) {
            if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
                gRPCErrorObject.code = StatusCodes.REQUEST_TIMEOUT;
                gRPCErrorObject.message = StatusCodes[StatusCodes.REQUEST_TIMEOUT];
            } else {
                gRPCErrorObject.code = error.response.status;
                gRPCErrorObject.message = StatusCodes[error.response.status];
            }
        } else {
            // Использовать логгер
        }

        callback(gRPCErrorObject);
    }
}

module.exports = call;