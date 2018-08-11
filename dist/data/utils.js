"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cloneElement(element, newValues) {
    if (newValues === void 0) { newValues = {}; }
    var base = Object.create(Object.getPrototypeOf(element));
    var clone = Object
        .assign(base, element, newValues);
    return Object.freeze(clone);
}
exports.cloneElement = cloneElement;

//# sourceMappingURL=utils.js.map
