"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyBuilder_1 = require("./PropertyBuilder");
var emptyGenericFactory = function (container, object) { return object; };
exports.BlankNodeBuilder = {
    createFrom: function (container, object) {
        return PropertyBuilder_1.PropertyBuilder.createFrom(emptyGenericFactory, container, object);
    }
};

//# sourceMappingURL=BlankNodeBuilder.js.map
