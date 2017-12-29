"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollectionToken = (function () {
    function CollectionToken() {
        this.token = "collection";
        this.objects = [];
    }
    CollectionToken.prototype.addObject = function (object) {
        this.objects.push(object);
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
