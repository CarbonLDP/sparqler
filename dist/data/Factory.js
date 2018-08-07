"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = {
    createFrom: function () {
        var clauseFactories = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            clauseFactories[_i] = arguments[_i];
        }
        return function (container, object) {
            return clauseFactories
                .reduce(function (target, factoryFn) { return factoryFn(container, target); }, object);
        };
    }
};

//# sourceMappingURL=Factory.js.map
