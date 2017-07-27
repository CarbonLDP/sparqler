"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function genericDecorator(properties, container, object) {
    for (var _i = 0, _a = Object.keys(properties); _i < _a.length; _i++) {
        var key = _a[_i];
        properties[key] = properties[key].bind(container);
    }
    return Object.assign(object, properties);
}
exports.genericDecorator = genericDecorator;

//# sourceMappingURL=utils.js.map
