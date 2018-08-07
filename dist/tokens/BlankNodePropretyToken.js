"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlankNodePropretyToken = (function () {
    function BlankNodePropretyToken() {
        this.token = "blankNodeTriple";
        this.properties = [];
    }
    BlankNodePropretyToken.prototype.toString = function () {
        if (!this.properties.length)
            return "[]";
        return "[ " + this.properties.join("; ") + " ]";
    };
    return BlankNodePropretyToken;
}());
exports.BlankNodePropretyToken = BlankNodePropretyToken;

//# sourceMappingURL=BlankNodePropretyToken.js.map
