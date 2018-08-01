"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver2_1 = require("../iri/IRIResolver2");
var FromToken_1 = require("../tokens/FromToken");
var utils_1 = require("./utils");
var WhereClause_1 = require("./WhereClause");
function getFromFn(genericFactory, container, named) {
    return function (iri) {
        var iriResolver = new IRIResolver2_1.IRIResolver2(container.iriResolver);
        var query = container.targetToken.queryClause;
        if (query.token !== "select")
            throw new Error("Does not exists a SELECT token to add the FROM data.");
        query = utils_1.cloneElement(query, {
            dataset: new FromToken_1.FromToken(iriResolver.resolve(iri), named)
        });
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: query });
        var newContainer = utils_1.cloneElement(container, {
            iriResolver: iriResolver,
            targetToken: queryToken,
        });
        return exports.FromClause.create(genericFactory, newContainer, {});
    };
}
exports.FromClause = {
    create: function (genericFactory, container, object) {
        return WhereClause_1.WhereClause.create(genericFactory, container, Object.assign(object, {
            from: getFromFn(genericFactory, container),
            fromNamed: getFromFn(genericFactory, container, true),
        }));
    },
};

//# sourceMappingURL=FormClause.js.map
