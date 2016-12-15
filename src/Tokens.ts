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

export const TRIPLE_SEPARATOR:NewLineSymbol = new NewLineSymbol( "." );
export const SAME_SUBJECT_SEPARATOR:NewLineSymbol = new NewLineSymbol( ";" );
export const SAME_PROPERTY_SEPARATOR:NewLineSymbol = new NewLineSymbol( "," );
export const EMPTY_SEPARATOR:NewLineSymbol = new NewLineSymbol( "" );

export const OPEN_BLOCK:NewLineSymbol = new NewLineSymbol( "{" );
export const CLOSE_BLOCK:NewLineSymbol = new NewLineSymbol( "}" );

export const OPEN_MULTI_BN:NewLineSymbol = new NewLineSymbol( "[" );
export const CLOSE_MULTI_BN:NewLineSymbol = new NewLineSymbol( "]" );
export const OPEN_SINGLE_BN:RightSymbol = new RightSymbol( "[" );
export const CLOSE_SINGLE_BN:RightSymbol = new RightSymbol( "]" );

export const OPEN_MULTI_LIST:NewLineSymbol = new NewLineSymbol( "(" );
export const CLOSE_MULTI_LIST:NewLineSymbol = new NewLineSymbol( ")" );
export const OPEN_SINGLE_LIST:LeftSymbol = new LeftSymbol( "(" );
export const CLOSE_SINGLE_LIST:RightSymbol = new RightSymbol( ")" );
