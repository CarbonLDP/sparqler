import { RightSymbol } from "./Tokens/RightSymbol";
import { LeftSymbol } from "./Tokens/LeftSymbol";
import { NewLineSymbol } from "./Tokens/NewLineSymbol";
import { Operator } from "./Tokens/Operator";

export const VAR_SYMBOL:LeftSymbol = new LeftSymbol( "?" );
export const PREFIX_SYMBOL:Operator = new Operator( ":" );
export const OFF_TYPE:Operator = new Operator( "^^" );
export const LANG_SYMBOL:Operator = new Operator( "@" );

export const OPEN_IRI:LeftSymbol = new LeftSymbol( "<" );
export const CLOSE_IRI:RightSymbol = new RightSymbol( ">" );

export const OPEN_QUOTE:LeftSymbol = new LeftSymbol( "\"" );
export const CLOSE_QUOTE:RightSymbol = new RightSymbol( "\"" );

export const END_LIST_TRIPLE:NewLineSymbol = new NewLineSymbol( "" );
export const END_TRIPLE:NewLineSymbol = new NewLineSymbol( "." );
export const END_SAME_SUBJECT:NewLineSymbol = new NewLineSymbol( ";" );
export const END_SAME_PROPERTY:NewLineSymbol = new NewLineSymbol( "," );

export const OPEN_BLOCK:NewLineSymbol = new NewLineSymbol( "{" );
export const CLOSE_BLOCK:NewLineSymbol = new NewLineSymbol( "}" );
