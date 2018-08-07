"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishClause = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            toCompactString: function () { return container.targetToken.toString(); },
            toPrettyString: function () { return container.targetToken.toString(); },
            toString: function () { return container.targetToken.toString(); },
        });
    }
};

//# sourceMappingURL=FinishClause.js.map
