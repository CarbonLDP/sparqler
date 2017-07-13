"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var finish_1 = require("sparqler/clauses/decorators/finish");
var IRIResolver_1 = require("sparqler/iri/IRIResolver");
var Container = (function () {
    function Container(previousContainerOrFinishDecorator, newTokens, iriResolver) {
        var _newTarget = this.constructor;
        var container = previousContainerOrFinishDecorator instanceof Function
            ? void 0
            : previousContainerOrFinishDecorator;
        var finishDecorator = previousContainerOrFinishDecorator instanceof Function
            ? previousContainerOrFinishDecorator
            : finish_1.finishDecorator;
        this._iriResolver = iriResolver
            ? iriResolver : container
            ? new IRIResolver_1.IRIResolver(container._iriResolver)
            : new IRIResolver_1.IRIResolver();
        var previousTokens = container ? container._tokens : [];
        if (!newTokens)
            newTokens = [];
        this._tokens = previousTokens.concat(newTokens);
        this._finishDecorator = container
            ? container._finishDecorator
            : finishDecorator;
        if (_newTarget === Container)
            Object.freeze(this);
    }
    return Container;
}());
exports.Container = Container;
exports.default = Container;

//# sourceMappingURL=Container.js.map
