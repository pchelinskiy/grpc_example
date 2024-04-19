const grpc = require('@grpc/grpc-js');

const config = require('../../config');
const services = require("./services");
const callWrapper = require('../callWrapper');

const server = new grpc.Server();

services.Account.reflection.addToServer(server);
server.addService(services.Account.definition, {
    getAccountParams: async (call, callback) => {
        await callWrapper(call, callback, services.Account.implementation.getAccountParams)
    }
});

server.bindAsync(config.PORT, grpc.ServerCredentials.createInsecure(), () => {
    require("../../amocrm");

    console.log(`Server started on ${config.PORT}`);
});