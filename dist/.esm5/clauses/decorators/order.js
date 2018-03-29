import { Container } from "./../Container";
import { limitOffsetDecorator } from "./";
import { BY, ORDER, } from "./../../patterns/tokens";
import { StringLiteral, } from "./../../tokens";
export function orderBy(rawCondition) {
    var tokens = [ORDER, BY, new StringLiteral(rawCondition)];
    var container = new Container(this, tokens);
    return this._finishDecorator(container, limitOffsetDecorator(container, {}));
}
export function orderDecorator(container, object) {
    return Object.assign(limitOffsetDecorator(container, object), {
        orderBy: orderBy.bind(container),
    });
}

//# sourceMappingURL=order.js.map
