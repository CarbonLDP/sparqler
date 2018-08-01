"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClauseFactory_1 = require("./ClauseFactory");
var LimitClause_1 = require("./LimitClause");
var OffsetClause_1 = require("./OffsetClause");
var ValuesClause_1 = require("./ValuesClause");
function _getLimitFactory(valuesFactory) {
    var offsetValuesFactory = OffsetClause_1.OffsetClause
        .create.bind(null, valuesFactory);
    return function (container1, object1) { return LimitClause_1.LimitClause
        .create(ClauseFactory_1.ClauseFactory.createFrom(offsetValuesFactory, valuesFactory), container1, object1); };
}
function _getOffsetFactory(valuesFactory) {
    var limitValuesFactory = LimitClause_1.LimitClause
        .create.bind(null, valuesFactory);
    return function (container1, object1) { return OffsetClause_1.OffsetClause
        .create(ClauseFactory_1.ClauseFactory.createFrom(valuesFactory, limitValuesFactory), container1, object1); };
}
exports.LimitOffsetClause = {
    create: function (genericFactory, container, object) {
        var valuesFactory = ValuesClause_1.ValuesClause
            .create.bind(null, genericFactory);
        var genericAndValuesFactory = ClauseFactory_1.ClauseFactory.createFrom(genericFactory, valuesFactory);
        return ClauseFactory_1.ClauseFactory.createFrom(_getLimitFactory(genericAndValuesFactory), _getOffsetFactory(genericAndValuesFactory), valuesFactory)(container, object);
    },
};

//# sourceMappingURL=LimitOffsetClause.js.map
