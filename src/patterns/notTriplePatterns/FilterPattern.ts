import { FilterToken } from "../../tokens/FilterToken";

import { NotTriplePattern } from "./NotTriplePattern";


/**
 * Wrapper for easier usage of SPARQL FILTER patterns.
 */
export interface FilterPattern extends NotTriplePattern<FilterToken> {
}
