"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("./../../patterns/tokens");
function getPattern() {
    return [tokens_1.OPEN_MULTI_BLOCK].concat(this._tokens, [tokens_1.CLOSE_MULTI_BLOCK]);
}
function subFinishDecorator(container, object) {
    return Object.assign(object, {
        getPattern: getPattern.bind(container),
    });
}
exports.subFinishDecorator = subFinishDecorator;

//# sourceMappingURL=subFinish.js.map
