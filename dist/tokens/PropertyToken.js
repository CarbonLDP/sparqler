"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyToken = (function () {
    function PropertyToken(verb) {
        this.token = "property";
        this.verb = verb;
        this.objects = [];
    }
    PropertyToken.prototype.addObject = function () {
        var object = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            object[_i] = arguments[_i];
        }
        var _a;
        (_a = this.objects).push.apply(_a, object);
        return this;
    };
    PropertyToken.prototype.toString = function () {
        return this.verb + " " + this.objects.join(", ");
    };
    return PropertyToken;
}());
exports.PropertyToken = PropertyToken;

//# sourceMappingURL=PropertyToken.js.map
