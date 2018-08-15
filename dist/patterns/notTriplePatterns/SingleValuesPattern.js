"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../data/utils");
var utils_2 = require("../utils");
var NotTriplePattern_1 = require("./NotTriplePattern");
function getHasFn(container) {
    return function (value) {
        var values = container.targetToken.values.slice();
        if (!values.length)
            values.push([]);
        values[0] = values[0].concat(utils_2.convertValue(value));
        var targetToken = utils_1.cloneElement(container.targetToken, { values: values });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return exports.SingleValuesPatternMore.createFrom(newContainer, {});
    };
}
exports.SingleValuesPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            has: getHasFn(container),
        }));
    },
};
exports.SingleValuesPatternMore = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            and: getHasFn(container),
        }));
    },
};

//# sourceMappingURL=SingleValuesPattern.js.map
