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
interface MediaArgs {
    searchPath: string;
    cursor?: string;
    limit?: string;
}
interface File {
    src: string;
    filename: string;
    size: number;
}
interface ListMediaRes {
    directories: string[];
    files: File[];
    cursor?: string;
    error?: string;
}
export interface PathConfig {
    publicFolder: string;
    mediaRoot: string;
}
declare type SuccessRecord = {
    ok: true;
} | {
    ok: false;
    message: string;
};
export declare class MediaModel {
    readonly publicFolder: string;
    readonly mediaRoot: string;
    constructor({ publicFolder, mediaRoot }: PathConfig);
    listMedia(args: MediaArgs): Promise<ListMediaRes>;
    deleteMedia(args: MediaArgs): Promise<SuccessRecord>;
}
export {};
