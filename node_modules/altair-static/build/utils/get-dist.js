"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistDirectory = void 0;
const path_1 = require("path");
/**
 * Returns the path to Altair assets, for resolving the assets when rendering Altair
 */
exports.getDistDirectory = () => path_1.resolve(__dirname, '../dist');
//# sourceMappingURL=get-dist.js.map