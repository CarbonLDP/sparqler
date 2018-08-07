"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../data/Factory");
var IRIResolver2_1 = require("../data/IRIResolver2");
var utils_1 = require("../data/utils");
var BaseToken_1 = require("../tokens/BaseToken");
var IRIToken_1 = require("../tokens/IRIToken");
var PrefixToken_1 = require("../tokens/PrefixToken");
var SelectClause_1 = require("./SelectClause");
function base(iri) {
    var token = new BaseToken_1.BaseToken(new IRIToken_1.IRIToken(iri));
    var prologues = this.targetToken
        .prologues.concat(token);
    var queryToken = utils_1.cloneElement(this.targetToken, { prologues: prologues });
    var container = utils_1.cloneElement(this, { targetToken: queryToken });
    return exports.QueryClause.createFrom(container, {});
}
function vocab(iri) {
    var iriResolver = new IRIResolver2_1.IRIResolver2(this.iriResolver, iri);
    var container = utils_1.cloneElement(this, { iriResolver: iriResolver });
    return exports.QueryClause.createFrom(container, {});
}
function prefix(name, iri) {
    var iriResolver = new IRIResolver2_1.IRIResolver2(this.iriResolver);
    var prologues = this.targetToken.prologues.slice();
    if (iriResolver._prefixes.has(name)) {
        var index = prologues
            .findIndex(function (token) { return token.token === "prefix" && token.namespace === name; });
        if (index !== -1)
            prologues.splice(index, 1);
    }
    prologues.push(new PrefixToken_1.PrefixToken(name, new IRIToken_1.IRIToken(iri)));
    iriResolver._prefixes.set(name, false);
    var queryToken = utils_1.cloneElement(this.targetToken, { prologues: prologues });
    var container = utils_1.cloneElement(this, {
        iriResolver: iriResolver,
        targetToken: queryToken,
    });
    return exports.QueryClause.createFrom(container, {});
}
exports.QueryClause = {
    createFrom: function (container, object) {
        var selectFactory = SelectClause_1.SelectClause
            .createFrom.bind(null, container.selectFinishClauseFactory);
        return Factory_1.Factory.createFrom(selectFactory)(container, Object.assign(object, {
            base: base.bind(container),
            vocab: vocab.bind(container),
            prefix: prefix.bind(container),
        }));
    },
};

//# sourceMappingURL=QueryClause.js.map
