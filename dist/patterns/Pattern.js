"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pattern = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            getPattern: function () { return container.targetToken; },
        });
    },
};

//# sourceMappingURL=Pattern.js.map
