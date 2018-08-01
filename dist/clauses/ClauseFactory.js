"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClauseFactory = {
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

//# sourceMappingURL=ClauseFactory.js.map
