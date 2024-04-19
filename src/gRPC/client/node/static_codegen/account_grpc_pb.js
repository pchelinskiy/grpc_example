// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var account_pb = require('./account_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var types_access_types_pb = require('./types/access.types_pb.js');
var types_account_types_pb = require('./types/account.types_pb.js');

function serialize_account_AccountRequest(arg) {
  if (!(arg instanceof account_pb.AccountRequest)) {
    throw new Error('Expected argument of type account.AccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_AccountRequest(buffer_arg) {
  return account_pb.AccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_AccountResponse(arg) {
  if (!(arg instanceof account_pb.AccountResponse)) {
    throw new Error('Expected argument of type account.AccountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_AccountResponse(buffer_arg) {
  return account_pb.AccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AccountService = exports.AccountService = {
  getAccountParams: {
    path: '/account.Account/getAccountParams',
    requestStream: false,
    responseStream: false,
    requestType: account_pb.AccountRequest,
    responseType: account_pb.AccountResponse,
    requestSerialize: serialize_account_AccountRequest,
    requestDeserialize: deserialize_account_AccountRequest,
    responseSerialize: serialize_account_AccountResponse,
    responseDeserialize: deserialize_account_AccountResponse,
  },
};

exports.AccountClient = grpc.makeGenericClientConstructor(AccountService);
