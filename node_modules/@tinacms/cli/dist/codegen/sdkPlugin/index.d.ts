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
/**
 * PLEASE READ THIS:
 *
 * This plugin is directly copied from https://github.com/dotansimha/graphql-code-generator/tree/master/packages/plugins/typescript/generic-sdk
 *
 * The reason this was needed is because we had to modified the return type of the SDK client. We need to return {data, variables, query}. While the other one just returned the data.
 *
 * This is the same as the above link and may need to be updated time to time. (for example if we want to support GQL v16). There is only one line that differs from the original. (This is shown)
 */
import { PluginFunction, PluginValidateFn } from '@graphql-codegen/plugin-helpers';
import { RawGenericSdkPluginConfig } from './config';
import { GenericSdkVisitor } from './visitor';
export declare const plugin: PluginFunction<RawGenericSdkPluginConfig>;
export declare const validate: PluginValidateFn<any>;
export { GenericSdkVisitor };
