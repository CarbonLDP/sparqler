"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = require("./printing");
var BlankNodePropertyToken = (function () {
    function BlankNodePropertyToken() {
        this.token = "blankNodeProperty";
        this.properties = [];
    }
    BlankNodePropertyToken.prototype.addProperty = function (property) {
        this.properties.push(property);
        return this;
    };
    BlankNodePropertyToken.prototype.toString = function (spaces) {
        return printing_1.getTokenContainerString({
            spaces: spaces,
            tags: { open: "[", close: "]" },
            tokensSeparator: ";",
            tokens: this.properties,
        });
    };
    return BlankNodePropertyToken;
}());
exports.BlankNodePropertyToken = BlankNodePropertyToken;

//# sourceMappingURL=BlankNodePropertyToken.js.map
