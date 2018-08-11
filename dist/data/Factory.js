"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = {
    createFrom: function () {
        var factories = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            factories[_i] = arguments[_i];
        }
        return function (container, object) {
            return factories
                .reduce(function (target, factoryFn) { return factoryFn(container, target); }, object);
        };
    }
};

//# sourceMappingURL=Factory.js.map
