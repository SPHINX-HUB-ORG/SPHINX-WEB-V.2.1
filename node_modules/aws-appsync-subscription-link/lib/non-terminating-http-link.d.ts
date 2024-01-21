/*!
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpOptions } from '@apollo/client/link/http';
import { NonTerminatingLink } from './non-terminating-link';
export declare class NonTerminatingHttpLink extends NonTerminatingLink {
    constructor(contextKey: string, options: HttpOptions);
}
