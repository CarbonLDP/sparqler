import { RightSymbol } from "../Tokens/RightSymbol";
import { LeftSymbol } from "../Tokens/LeftSymbol";
import { NewLineSymbol } from "../Tokens/NewLineSymbol";
import { Operator } from "../Tokens/Operator";
import { Identifier } from "../Tokens/Identifier";

export const VAR_SYMBOL:LeftSymbol = new LeftSymbol( "?" );
export const PREFIX_SYMBOL:Operator = new Operator( ":" );
export const OFF_TYPE:Operator = new Operator( "^^" );
export const LANG_SYMBOL:Operator = new Operator( "@" );
export const ALL:RightSymbol = new RightSymbol( "*" );

export const OPEN_IRI:LeftSymbol = new LeftSymbol( "<" );
export const CLOSE_IRI:RightSymbol = new RightSymbol( ">" );

export const OPEN_QUOTE:LeftSymbol = new LeftSymbol( "\"" );
export const CLOSE_QUOTE:RightSymbol = new RightSymbol( "\"" );

export const GRAPH_PATTERN_SEPARATOR:NewLineSymbol = new NewLineSymbol( "." );
export const SAME_SUBJECT_SEPARATOR:NewLineSymbol = new NewLineSymbol( ";" );
export const SAME_PROPERTY_SEPARATOR:NewLineSymbol = new NewLineSymbol( "," );
export const EMPTY_SEPARATOR:NewLineSymbol = new NewLineSymbol( "" );

export const OPEN_MULTI_BLOCK:NewLineSymbol = new NewLineSymbol( "{" );
export const CLOSE_MULTI_BLOCK:NewLineSymbol = new NewLineSymbol( "}" );
export const OPEN_SINGLE_BLOCK:LeftSymbol = new LeftSymbol( "{" );
export const CLOSE_SINGLE_BLOCK:RightSymbol = new RightSymbol( "}" );

export const OPEN_MULTI_BN:NewLineSymbol = new NewLineSymbol( "[" );
export const CLOSE_MULTI_BN:NewLineSymbol = new NewLineSymbol( "]" );
export const OPEN_SINGLE_BN:LeftSymbol = new LeftSymbol( "[" );
export const CLOSE_SINGLE_BN:RightSymbol = new RightSymbol( "]" );

export const OPEN_MULTI_LIST:NewLineSymbol = new NewLineSymbol( "(" );
export const CLOSE_MULTI_LIST:NewLineSymbol = new NewLineSymbol( ")" );
export const OPEN_SINGLE_LIST:LeftSymbol = new LeftSymbol( "(" );
export const CLOSE_SINGLE_LIST:RightSymbol = new RightSymbol( ")" );

export const BASE:Identifier = new Identifier( "BASE" );
export const PREFIX:Identifier = new Identifier( "PREFIX" );
export const SELECT:Identifier = new Identifier( "SELECT" );
export const FROM:Identifier = new Identifier( "FROM" );
export const NAMED:Identifier = new Identifier( "NAMED" );
export const WHERE:Identifier = new Identifier( "WHERE" );
export const GROUP:Identifier = new Identifier( "GROUP" );
export const BY:Identifier = new Identifier( "BY" );
export const HAVING:Identifier = new Identifier( "HAVING" );
export const ORDER:Identifier = new Identifier( "ORDER" );
export const LIMIT:Identifier = new Identifier( "LIMIT" );
export const OFFSET:Identifier = new Identifier( "OFFSET" );

export const GRAPH:Identifier = new Identifier( "GRAPH" );
export const OPTIONAL:Identifier = new Identifier( "OPTIONAL" );
export const UNION:Identifier = new Identifier( "UNION" );
export const MINUS:Identifier = new Identifier( "MINUS" );
export const VALUES:Identifier = new Identifier( "VALUES" );
export const UNDEF:Identifier = new Identifier( "UNDEF" );

export const DISTINCT:Identifier = new Identifier( "DISTINCT" );
export const REDUCED:Identifier = new Identifier( "REDUCED" );

export const SERVICE:Identifier = new Identifier( "SERVICE" );
export const SILENT:Identifier = new Identifier( "SILENT" );

export const BIND:Identifier = new Identifier( "BIND" );
export const AS:Identifier = new Identifier( "AS" );

