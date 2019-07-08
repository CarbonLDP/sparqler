import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { Literal } from "../triplePatterns/Literal";
import { Resource } from "../triplePatterns/Resource";
import { Variable } from "../triplePatterns/Variable";
import { Expression } from "./Expression";

export type PrimaryExpression = Expression | Resource | Literal | Variable | SupportedNativeTypes;
