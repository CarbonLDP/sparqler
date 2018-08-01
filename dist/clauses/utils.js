"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cloneElement(element, newValues) {
    if (newValues === void 0) { newValues = {}; }
    var clone = Object.create(Object.getPrototypeOf(element));
    return Object
        .assign(clone, element, newValues);
}
exports.cloneElement = cloneElement;
function _cloneElement(container, newValues) {
    var clone = Object.create(Object.getPrototypeOf(container));
    Object
        .keys(container)
        .forEach(function (key) {
        if (key in newValues) {
            var value = newValues[key];
            if (value !== void 0) {
                clone[key] = value;
                return;
            }
        }
        clone[key] = container[key];
    });
    return clone;
}
exports._cloneElement = _cloneElement;

//# sourceMappingURL=utils.js.map
