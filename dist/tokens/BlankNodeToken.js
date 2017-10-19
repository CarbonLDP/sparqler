"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlankNodeToken = (function () {
    function BlankNodeToken(label) {
        this.token = "blankNode";
        if (!label)
            return;
        this.label = label;
    }
    BlankNodeToken.prototype.toString = function () {
        if (this.label)
            return this.label;
        return "[]";
    };
    return BlankNodeToken;
}());
exports.BlankNodeToken = BlankNodeToken;

//# sourceMappingURL=BlankNodeToken.js.map
