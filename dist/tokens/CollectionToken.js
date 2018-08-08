"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = require("./printing");
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
    CollectionToken.prototype.toString = function (spaces) {
        return printing_1.getTokenContainerString({
            spaces: spaces,
            tags: { open: "(", close: ")" },
            tokens: this.objects,
        });
    };
    return CollectionToken;
}());
exports.CollectionToken = CollectionToken;

//# sourceMappingURL=CollectionToken.js.map
