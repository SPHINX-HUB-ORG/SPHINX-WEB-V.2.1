"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Subscription link enums
var SUBSCRIPTION_STATUS;
(function (SUBSCRIPTION_STATUS) {
    SUBSCRIPTION_STATUS[SUBSCRIPTION_STATUS["PENDING"] = 0] = "PENDING";
    SUBSCRIPTION_STATUS[SUBSCRIPTION_STATUS["CONNECTED"] = 1] = "CONNECTED";
    SUBSCRIPTION_STATUS[SUBSCRIPTION_STATUS["FAILED"] = 2] = "FAILED";
})(SUBSCRIPTION_STATUS = exports.SUBSCRIPTION_STATUS || (exports.SUBSCRIPTION_STATUS = {}));
var SOCKET_STATUS;
(function (SOCKET_STATUS) {
    SOCKET_STATUS[SOCKET_STATUS["CLOSED"] = 0] = "CLOSED";
    SOCKET_STATUS[SOCKET_STATUS["READY"] = 1] = "READY";
    SOCKET_STATUS[SOCKET_STATUS["CONNECTING"] = 2] = "CONNECTING";
})(SOCKET_STATUS = exports.SOCKET_STATUS || (exports.SOCKET_STATUS = {}));
var MESSAGE_TYPES;
(function (MESSAGE_TYPES) {
    /**
     * Client -> Server message.
     * This message type is the first message after handshake and this will initialize AWS AppSync RealTime communication
     */
    MESSAGE_TYPES["GQL_CONNECTION_INIT"] = "connection_init";
    /**
     * Server -> Client message
     * This message type is in case there is an issue with AWS AppSync RealTime when establishing connection
     */
    MESSAGE_TYPES["GQL_CONNECTION_ERROR"] = "connection_error";
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_CONNECTION_INIT message
     */
    MESSAGE_TYPES["GQL_CONNECTION_ACK"] = "connection_ack";
    /**
     * Client -> Server message.
     * This message type is for register subscriptions with AWS AppSync RealTime
     */
    MESSAGE_TYPES["GQL_START"] = "start";
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_START message
     */
    MESSAGE_TYPES["GQL_START_ACK"] = "start_ack";
    /**
     * Server -> Client message.
     * This message type is for subscription message from AWS AppSync RealTime
     */
    MESSAGE_TYPES["GQL_DATA"] = "data";
    /**
     * Server -> Client message.
     * This message type helps the client to know is still receiving messages from AWS AppSync RealTime
     */
    MESSAGE_TYPES["GQL_CONNECTION_KEEP_ALIVE"] = "ka";
    /**
     * Client -> Server message.
     * This message type is for unregister subscriptions with AWS AppSync RealTime
     */
    MESSAGE_TYPES["GQL_STOP"] = "stop";
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_STOP message
     */
    MESSAGE_TYPES["GQL_COMPLETE"] = "complete";
    /**
     * Server -> Client message.
     * This message type is for sending error messages from AWS AppSync RealTime to the client
     */
    MESSAGE_TYPES["GQL_ERROR"] = "error"; // Server -> Client
})(MESSAGE_TYPES = exports.MESSAGE_TYPES || (exports.MESSAGE_TYPES = {}));
var CONTROL_MSG;
(function (CONTROL_MSG) {
    CONTROL_MSG["CONNECTION_CLOSED"] = "Connection closed";
    CONTROL_MSG["TIMEOUT_DISCONNECT"] = "Timeout disconnect";
    CONTROL_MSG["SUBSCRIPTION_ACK"] = "Subscription ack";
})(CONTROL_MSG = exports.CONTROL_MSG || (exports.CONTROL_MSG = {}));
//#endregion
