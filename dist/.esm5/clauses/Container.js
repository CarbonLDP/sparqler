import { finishDecorator as originalFinishDecorator } from "./decorators/finish";
import { subFinishDecorator } from "./decorators/subFinish";
import { IRIResolver } from "./../iri/IRIResolver";
var Container = (function () {
    function Container(containerOrFunction, newTokens, iriResolver) {
        var _newTarget = this.constructor;
        var container = containerOrFunction instanceof Function ?
            void 0 : containerOrFunction;
        var finishDecorator = containerOrFunction instanceof Function
            ? containerOrFunction : originalFinishDecorator;
        this._iriResolver = finishDecorator !== subFinishDecorator ? !iriResolver ? container ? container._iriResolver ?
            new IRIResolver(container._iriResolver) : void 0 : new IRIResolver() : iriResolver : void 0;
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
export { Container };
export default Container;

//# sourceMappingURL=Container.js.map
