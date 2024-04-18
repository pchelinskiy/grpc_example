const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const reflection = require('@grpc/reflection');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../proto/account.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);

module.exports = ({
    service: grpcObject.Account.service,
    reflection: new reflection.ReflectionService(packageDefinition),
})