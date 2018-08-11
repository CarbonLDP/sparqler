"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = require("../data/IRIResolver");
var utils_1 = require("../data/utils");
var FromToken_1 = require("../tokens/FromToken");
var WhereClause_1 = require("./WhereClause");
function getFromFn(genericFactory, container, named) {
    return function (iri) {
        var iriResolver = new IRIResolver_1.IRIResolver(container.iriResolver);
        var queryClause = utils_1.cloneElement(container.targetToken.queryClause, {
            dataset: new FromToken_1.FromToken(iriResolver.resolve(iri), named)
        });
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: queryClause });
        var newContainer = utils_1.cloneElement(container, {
            iriResolver: iriResolver,
            targetToken: queryToken,
        });
        return exports.FromClause.createFrom(genericFactory, newContainer, {});
    };
}
exports.FromClause = {
    createFrom: function (genericFactory, container, object) {
        return WhereClause_1.WhereClause.createFrom(genericFactory, container, Object.assign(object, {
            from: getFromFn(genericFactory, container),
            fromNamed: getFromFn(genericFactory, container, true),
        }));
    },
};

//# sourceMappingURL=FromClause.js.map
