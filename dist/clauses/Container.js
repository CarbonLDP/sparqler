"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = require("../iri/IRIResolver");
var finish_1 = require("./decorators/finish");
var subFinish_1 = require("./decorators/subFinish");
var Container = (function () {
    function Container(containerOrFunction, newTokens, iriResolver) {
        var _newTarget = this.constructor;
        var container = containerOrFunction instanceof Function ?
            void 0 : containerOrFunction;
        var finishDecorator = containerOrFunction instanceof Function
            ? containerOrFunction : finish_1.finishDecorator;
        this._iriResolver = finishDecorator !== subFinish_1.subFinishDecorator ? !iriResolver ? container ? container._iriResolver ?
            new IRIResolver_1.IRIResolver(container._iriResolver) : void 0 : new IRIResolver_1.IRIResolver() : iriResolver : void 0;
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
