import { PluginFunction, PluginValidateFn } from '@graphql-codegen/plugin-helpers';
import { RawGenericSdkPluginConfig } from './config';
import { GenericSdkVisitor } from './visitor';
export declare const plugin: PluginFunction<RawGenericSdkPluginConfig>;
export declare const validate: PluginValidateFn<any>;
export { GenericSdkVisitor };
