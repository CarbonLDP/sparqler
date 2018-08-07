"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyToken_1 = require("../../tokens/PropertyToken");
var utils_1 = require("../utils");
function getHasFn(container) {
    return function (property, objects) {
        var verbToken = (typeof property === "string")
            ? utils_1._resolvePath(container, property)
            : property.getSubject();
        var propertyToken = new PropertyToken_1.PropertyToken(verbToken);
        objects = Array.isArray(objects) ? objects : [objects];
        propertyToken.addObject.apply(propertyToken, objects.map(utils_1.convertValue));
        container.targetToken.properties
            .push(propertyToken);
        return exports.BlankNodeBuilderAnd.createFrom(container, {});
    };
}
exports.BlankNodeBuilder = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            has: getHasFn(container),
        });
    }
};
exports.BlankNodeBuilderAnd = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            and: getHasFn(container),
        });
    }
};

//# sourceMappingURL=BlankNodeBuilder.js.map
