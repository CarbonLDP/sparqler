"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilterToken = (function () {
    function FilterToken(constraint) {
        this.token = "filter";
        this.constraint = constraint;
    }
    FilterToken.prototype.toString = function (spaces) {
        return "FILTER( " + this.constraint + " )";
    };
    return FilterToken;
}());
exports.FilterToken = FilterToken;

//# sourceMappingURL=FilterToken.js.map
