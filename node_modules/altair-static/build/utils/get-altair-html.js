"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const get_dist_1 = require("./get-dist");
function getAltairHtml() {
    return fs_1.readFileSync(path_1.resolve(get_dist_1.getDistDirectory(), 'index.html'), 'utf8');
}
exports.default = getAltairHtml;
//# sourceMappingURL=get-altair-html.js.map