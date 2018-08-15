"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../data/utils");
var PropertyToken_1 = require("../../tokens/PropertyToken");
var utils_2 = require("../utils");
function _cloneContainer(container, propertyToken) {
    var properties = container.targetToken.properties.concat(propertyToken);
    var targetToken = utils_1.cloneElement(container.targetToken, { properties: properties });
    return utils_1.cloneElement(container, { targetToken: targetToken });
}
function _updateContainer(container, propertyToken) {
    container.targetToken.properties.push(propertyToken);
    return container;
}
function getHasFn(genericFactory, container) {
    return function (property, objects) {
        var verbToken = (typeof property === "string")
            ? utils_2._resolvePath(container, property)
            : property.getSubject();
        var propertyToken = new PropertyToken_1.PropertyToken(verbToken);
        objects = Array.isArray(objects) ? objects : [objects];
        propertyToken.addObject.apply(propertyToken, objects.map(utils_2.convertValue));
        var newContainer = container.targetToken.token === "subject" ?
            _cloneContainer(container, propertyToken) :
            _updateContainer(container, propertyToken);
        var genericObject = genericFactory(newContainer, {});
        return exports.PropertyBuilderMore.createFrom(genericFactory, newContainer, genericObject);
    };
}
exports.PropertyBuilder = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            has: getHasFn(genericFactory, container),
        });
    }
};
exports.PropertyBuilderMore = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            and: getHasFn(genericFactory, container),
        });
    }
};

//# sourceMappingURL=PropertyBuilder.js.map
