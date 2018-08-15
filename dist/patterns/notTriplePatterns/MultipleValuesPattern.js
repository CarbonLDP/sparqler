"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../data/utils");
var utils_2 = require("../utils");
var NotTriplePattern_1 = require("./NotTriplePattern");
function getHasFn(container) {
    return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var parsedValues = container.targetToken.values.slice();
        parsedValues.push(values.map(utils_2.convertValue));
        var targetToken = utils_1.cloneElement(container.targetToken, { values: parsedValues });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return exports.MultipleValuesPatternMore.createFrom(newContainer, {});
    };
}
exports.MultipleValuesPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            has: getHasFn(container),
        }));
    },
};
exports.MultipleValuesPatternMore = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            and: getHasFn(container),
        }));
    },
};

//# sourceMappingURL=MultipleValuesPattern.js.map
