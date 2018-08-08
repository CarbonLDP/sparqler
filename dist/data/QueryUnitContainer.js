"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Container2_1 = require("./Container2");
var QueryUnitContainer = (function (_super) {
    __extends(QueryUnitContainer, _super);
    function QueryUnitContainer(data) {
        var _this = _super.call(this, data) || this;
        _this.selectFinishClauseFactory = data.selectFinishClauseFactory;
        return _this;
    }
    return QueryUnitContainer;
}(Container2_1.Container2));
exports.QueryUnitContainer = QueryUnitContainer;

//# sourceMappingURL=QueryUnitContainer.js.map
