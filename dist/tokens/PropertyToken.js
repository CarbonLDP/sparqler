"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = require("./printing");
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
    PropertyToken.prototype.toString = function (spaces) {
        var separator = printing_1.getSeparator(spaces);
        var verb = "" + this.verb;
        var objectSpaces = printing_1.addSpaces(spaces, verb.length + 1);
        var objectIndent = printing_1.getIndentation(objectSpaces);
        var objects = this.objects
            .map(function (object) {
            if (object.token === "collection" || object.token === "blankNodeProperty")
                return object.toString(spaces);
            return object.toString(objectSpaces);
        })
            .join("," + separator + objectIndent);
        return verb + " " + objects;
    };
    return PropertyToken;
}());
exports.PropertyToken = PropertyToken;

//# sourceMappingURL=PropertyToken.js.map
