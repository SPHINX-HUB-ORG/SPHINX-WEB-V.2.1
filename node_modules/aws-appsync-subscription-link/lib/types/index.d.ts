import { AuthOptions } from "aws-appsync-auth-link";
export declare enum SUBSCRIPTION_STATUS {
    PENDING = 0,
    CONNECTED = 1,
    FAILED = 2
}
export declare enum SOCKET_STATUS {
    CLOSED = 0,
    READY = 1,
    CONNECTING = 2
}
export declare enum MESSAGE_TYPES {
    /**
     * Client -> Server message.
     * This message type is the first message after handshake and this will initialize AWS AppSync RealTime communication
     */
    GQL_CONNECTION_INIT = "connection_init",
    /**
     * Server -> Client message
     * This message type is in case there is an issue with AWS AppSync RealTime when establishing connection
     */
    GQL_CONNECTION_ERROR = "connection_error",
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_CONNECTION_INIT message
     */
    GQL_CONNECTION_ACK = "connection_ack",
    /**
     * Client -> Server message.
     * This message type is for register subscriptions with AWS AppSync RealTime
     */
    GQL_START = "start",
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_START message
     */
    GQL_START_ACK = "start_ack",
    /**
     * Server -> Client message.
     * This message type is for subscription message from AWS AppSync RealTime
     */
    GQL_DATA = "data",
    /**
     * Server -> Client message.
     * This message type helps the client to know is still receiving messages from AWS AppSync RealTime
     */
    GQL_CONNECTION_KEEP_ALIVE = "ka",
    /**
     * Client -> Server message.
     * This message type is for unregister subscriptions with AWS AppSync RealTime
     */
    GQL_STOP = "stop",
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_STOP message
     */
    GQL_COMPLETE = "complete",
    /**
     * Server -> Client message.
     * This message type is for sending error messages from AWS AppSync RealTime to the client
     */
    GQL_ERROR = "error"
}
export declare enum CONTROL_MSG {
    CONNECTION_CLOSED = "Connection closed",
    TIMEOUT_DISCONNECT = "Timeout disconnect",
    SUBSCRIPTION_ACK = "Subscription ack"
}
export declare type UrlInfo = {
    url: string;
    auth: AuthOptions;
    region: string;
};
export declare type ObserverQuery = {
    observer: ZenObservable.SubscriptionObserver<any>;
    query: string;
    variables: object;
    subscriptionState: SUBSCRIPTION_STATUS;
    subscriptionReadyCallback?: Function;
    subscriptionFailedCallback?: Function;
    startAckTimeoutId?: number;
};
export declare type DelayFunction = (attempt: number, args?: any[], error?: Error) => number | false;
