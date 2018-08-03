"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollectionToken = (function () {
    function CollectionToken() {
        this.token = "collection";
        this.objects = [];
    }
    CollectionToken.prototype.addObject = function () {
        var object = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            object[_i] = arguments[_i];
        }
        var _a;
        (_a = this.objects).push.apply(_a, object);
        return this;
    };
    CollectionToken.prototype.toString = function () {
        if (!this.objects.length)
            return "()";
        return "( " + this.objects.join(" ") + " )";
    };
    return CollectionToken;
}());
exports.CollectionToken = CollectionToken;

//# sourceMappingURL=CollectionToken.js.map
