"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishClause = {
    createFrom: function (container, object) {
        var toPrettyString = function () {
            return container.targetToken.toString(0);
        };
        return Object.assign(object, {
            toCompactString: function () { return container.targetToken.toString(); },
            toPrettyString: toPrettyString,
            toString: toPrettyString,
        });
    }
};

//# sourceMappingURL=FinishClause.js.map
