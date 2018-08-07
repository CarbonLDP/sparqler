"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cloneElement(element, newValues) {
    if (newValues === void 0) { newValues = {}; }
    var clone = Object.create(Object.getPrototypeOf(element));
    return Object
        .assign(clone, element, newValues);
}
exports.cloneElement = cloneElement;

//# sourceMappingURL=utils.js.map
