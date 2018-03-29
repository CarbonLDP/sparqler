import { Container } from "./../Container";
import { orderDecorator } from "./";
import { HAVING } from "./../../patterns/tokens";
import { StringLiteral, } from "./../../tokens";
function having(rawCondition) {
    const tokens = [HAVING, new StringLiteral(rawCondition)];
    const container = new Container(this, tokens);
    return this._finishDecorator(container, orderDecorator(container, {}));
}
export function havingDecorator(container, object) {
    return Object.assign(orderDecorator(container, object), {
        having: having.bind(container),
    });
}

//# sourceMappingURL=having.js.map
