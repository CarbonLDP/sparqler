"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container = (function () {
    function Container(data) {
        var _newTarget = this.constructor;
        this.iriResolver = data.iriResolver;
        this.targetToken = data.targetToken;
        if (_newTarget === Container)
            Object.freeze(this);
    }
    return Container;
}());
exports.Container = Container;

//# sourceMappingURL=Container.js.map
