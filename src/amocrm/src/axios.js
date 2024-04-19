const axios = require('axios');

const axiosInstance = axios.create();

function request(config) {
    // console.log("Перед отправкой")
    // console.log(config)
    return config
}

function reqError(error) {
    // console.log("Ошибка при отправке")
    // console.log(error)
    return Promise.reject(error);
}

function response(response) {
    // console.log("После отправки")
    // console.log(response)
    return response
}

function resError(error) {
    // console.log("Ответ с ошибкой")
    // console.log(error)
    return Promise.reject(error);
}

axiosInstance.interceptors.request.use(request, reqError);
axiosInstance.interceptors.response.use(response, resError);

module.exports = axiosInstance;