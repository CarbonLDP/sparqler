import { Container } from "./../Container";
import { havingDecorator } from "./";
import { BY, GROUP, } from "./../../patterns/tokens";
import { StringLiteral, } from "./../../tokens";
function groupBy(rawCondition) {
    const tokens = [GROUP, BY, new StringLiteral(rawCondition)];
    const container = new Container(this, tokens);
    return this._finishDecorator(container, havingDecorator(container, {}));
}
export function groupDecorator(container, object) {
    return Object.assign(havingDecorator(container, object), {
        groupBy: groupBy.bind(container),
    });
}

//# sourceMappingURL=group.js.map
