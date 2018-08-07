"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriplePattern = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            getSubject: function () { return container.targetToken.subject; },
        });
    }
};

//# sourceMappingURL=TriplePattern.js.map
