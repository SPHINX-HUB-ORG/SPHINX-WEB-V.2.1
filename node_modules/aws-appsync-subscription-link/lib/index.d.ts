import { CONTROL_EVENTS_KEY } from "./subscription-handshake-link";
import { ApolloLink } from "@apollo/client/core";
import { UrlInfo } from "./types";
declare function createSubscriptionHandshakeLink(args: UrlInfo, resultsFetcherLink?: ApolloLink): ApolloLink;
declare function createSubscriptionHandshakeLink(url: string, resultsFetcherLink?: ApolloLink): ApolloLink;
export { CONTROL_EVENTS_KEY, createSubscriptionHandshakeLink };
