"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../data/Factory");
var LimitClause_1 = require("./LimitClause");
var OffsetClause_1 = require("./OffsetClause");
var ValuesClause_1 = require("./ValuesClause");
function _getLimitFactory(valuesFactory) {
    var offsetValuesFactory = OffsetClause_1.OffsetClause
        .createFrom.bind(null, valuesFactory);
    return function (container1, object1) { return LimitClause_1.LimitClause
        .createFrom(Factory_1.Factory.createFrom(offsetValuesFactory, valuesFactory), container1, object1); };
}
function _getOffsetFactory(valuesFactory) {
    var limitValuesFactory = LimitClause_1.LimitClause
        .createFrom.bind(null, valuesFactory);
    return function (container1, object1) { return OffsetClause_1.OffsetClause
        .createFrom(Factory_1.Factory.createFrom(valuesFactory, limitValuesFactory), container1, object1); };
}
exports.LimitOffsetClause = {
    createFrom: function (genericFactory, container, object) {
        var valuesFactory = ValuesClause_1.ValuesClause
            .createFrom.bind(null, genericFactory);
        var genericAndValuesFactory = Factory_1.Factory.createFrom(genericFactory, valuesFactory);
        return Factory_1.Factory.createFrom(_getLimitFactory(genericAndValuesFactory), _getOffsetFactory(genericAndValuesFactory), valuesFactory)(container, object);
    },
};

//# sourceMappingURL=LimitOffsetClause.js.map
