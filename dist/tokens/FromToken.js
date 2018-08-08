"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FromToken = (function () {
    function FromToken(source, named) {
        if (named === void 0) { named = false; }
        this.token = "from";
        this.source = source;
        this.named = named;
    }
    FromToken.prototype.toString = function (spaces) {
        var str = "FROM ";
        if (this.named)
            str += "NAMED ";
        return str + this.source;
    };
    return FromToken;
}());
exports.FromToken = FromToken;

//# sourceMappingURL=FromToken.js.map
