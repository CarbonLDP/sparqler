import { finishDecorator as originalFinishDecorator } from "./decorators/finish";
import { subFinishDecorator } from "./decorators/subFinish";
import { IRIResolver } from "./../iri/IRIResolver";
export class Container {
    constructor(containerOrFunction, newTokens, iriResolver) {
        const container = containerOrFunction instanceof Function ?
            void 0 : containerOrFunction;
        const finishDecorator = containerOrFunction instanceof Function
            ? containerOrFunction : originalFinishDecorator;
        this._iriResolver = finishDecorator !== subFinishDecorator ? !iriResolver ? container ? container._iriResolver ?
            new IRIResolver(container._iriResolver) : void 0 : new IRIResolver() : iriResolver : void 0;
        const previousTokens = container ? container._tokens : [];
        if (!newTokens)
            newTokens = [];
        this._tokens = previousTokens.concat(newTokens);
        this._finishDecorator = container
            ? container._finishDecorator
            : finishDecorator;
        if (new.target === Container)
            Object.freeze(this);
    }
}
export default Container;

//# sourceMappingURL=Container.js.map
