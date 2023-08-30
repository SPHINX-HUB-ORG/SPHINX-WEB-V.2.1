/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { ClientSideBasePluginConfig, ClientSideBaseVisitor, LoadedFragment } from '@graphql-codegen/visitor-plugin-common';
import { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { RawGenericSdkPluginConfig } from './config';
export interface GenericSdkPluginConfig extends ClientSideBasePluginConfig {
    usingObservableFrom: string;
}
export declare class GenericSdkVisitor extends ClientSideBaseVisitor<RawGenericSdkPluginConfig, GenericSdkPluginConfig> {
    private _operationsToInclude;
    constructor(schema: GraphQLSchema, fragments: LoadedFragment[], rawConfig: RawGenericSdkPluginConfig);
    protected buildOperation(node: OperationDefinitionNode, documentVariableName: string, operationType: string, operationResultType: string, operationVariablesTypes: string): string;
    get sdkContent(): string;
}
