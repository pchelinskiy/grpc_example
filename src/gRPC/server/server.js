const grpc = require('@grpc/grpc-js');

const config = require('../../config');
const services = require("./services");

const server = new grpc.Server();

server.addService(services.main.service, {

})

server.bindAsync(config.PORT, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});