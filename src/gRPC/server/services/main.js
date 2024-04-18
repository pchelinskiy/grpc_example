const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const reflection = require('@grpc/reflection');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../proto/main.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const mainProto = grpc.loadPackageDefinition(packageDefinition).main;

module.exports = ({
    service: mainProto.Main.service,
    reflection: new reflection.ReflectionService(packageDefinition),
})