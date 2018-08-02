import { BindToken } from "./BindToken";
import { FilterToken } from "./FilterToken";
import { GraphToken } from "./GraphToken";
import { OptionalToken } from "./OptionalToken";
import { ValuesToken } from "./ValuesToken";


export type NotTripleToken = OptionalToken | GraphToken | BindToken | FilterToken | ValuesToken;