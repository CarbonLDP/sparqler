import { Container } from "sparqler/clauses";
export interface FunctionProperties {
    [method: string]: Function;
}
export declare function genericDecorator<U extends FunctionProperties, W extends object>(properties: U, container: Container<any>, object: W): W & U;
