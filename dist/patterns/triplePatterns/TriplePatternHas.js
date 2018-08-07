"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../../data/Factory");
var utils_1 = require("../../data/utils");
var PropertyToken_1 = require("../../tokens/PropertyToken");
var Pattern_1 = require("../Pattern");
var utils_2 = require("../utils");
var TriplePattern_1 = require("./TriplePattern");
function getHasFn(container) {
    return function (property, objects) {
        var verbToken = (typeof property === "string")
            ? utils_2._resolvePath(container, property)
            : property.getSubject();
        var propertyToken = new PropertyToken_1.PropertyToken(verbToken);
        objects = Array.isArray(objects) ? objects : [objects];
        propertyToken.addObject.apply(propertyToken, objects.map(utils_2.convertValue));
        var properties = container.targetToken.properties.concat(propertyToken);
        var targetToken = utils_1.cloneElement(container.targetToken, { properties: properties });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return exports.TriplePatternAnd.createFrom(newContainer, {});
    };
}
exports.TriplePatternHas = {
    createFrom: function (container, object) {
        return TriplePattern_1.TriplePattern.createFrom(container, Object.assign(object, {
            has: getHasFn(container),
        }));
    }
};
exports.TriplePatternAnd = {
    createFrom: function (container, object) {
        return Factory_1.Factory.createFrom(Pattern_1.Pattern.createFrom, TriplePattern_1.TriplePattern.createFrom)(container, Object.assign(object, {
            and: getHasFn(container),
        }));
    }
};

//# sourceMappingURL=TriplePatternHas.js.map
