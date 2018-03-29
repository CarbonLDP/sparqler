import { CLOSE_MULTI_BLOCK, OPEN_MULTI_BLOCK, } from "./../../patterns/tokens";
function getPattern() {
    return [OPEN_MULTI_BLOCK, ...this._tokens, CLOSE_MULTI_BLOCK];
}
export function subFinishDecorator(container, object) {
    return Object.assign(object, {
        getPattern: getPattern.bind(container),
    });
}

//# sourceMappingURL=subFinish.js.map
