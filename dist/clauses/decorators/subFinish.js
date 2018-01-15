"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("../../patterns/tokens");
var utils_1 = require("./utils");
function getPattern() {
    return [tokens_1.OPEN_MULTI_BLOCK].concat(this._tokens, [tokens_1.CLOSE_MULTI_BLOCK]);
}
function subFinishDecorator(container, object) {
    return utils_1.genericDecorator({ getPattern: getPattern }, container, object);
}
exports.subFinishDecorator = subFinishDecorator;

//# sourceMappingURL=subFinish.js.map
