const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const reflection = require('@grpc/reflection');
const path = require('path');

const amoClient = require("../../../amocrm");

const PROTO_PATH = path.join(__dirname, '../proto/account.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).account;

module.exports = ({
    definition: proto.Account.service,
    reflection: new reflection.ReflectionService(packageDefinition),
    implementation: {
        getAccountParams: {
            instance: amoClient.Entity.Account,
            method: "find"
        }
    }
})