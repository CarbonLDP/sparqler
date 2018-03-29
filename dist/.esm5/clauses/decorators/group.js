import { Container } from "./../Container";
import { havingDecorator } from "./";
import { BY, GROUP, } from "./../../patterns/tokens";
import { StringLiteral, } from "./../../tokens";
function groupBy(rawCondition) {
    var tokens = [GROUP, BY, new StringLiteral(rawCondition)];
    var container = new Container(this, tokens);
    return this._finishDecorator(container, havingDecorator(container, {}));
}
export function groupDecorator(container, object) {
    return Object.assign(havingDecorator(container, object), {
        groupBy: groupBy.bind(container),
    });
}

//# sourceMappingURL=group.js.map
