import { Container } from "../../data/Container";
import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { PropertyBuilder } from "./PropertyBuilder";
export interface BlankNodeBuilder extends PropertyBuilder<{}> {
}
export declare const BlankNodeBuilder: {
    createFrom<C extends Container<BlankNodePropertyToken>, O extends object>(container: C, object: O): O & BlankNodeBuilder;
};
