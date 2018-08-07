import { TokenNode } from "../tokens/TokenNode";
import { IRIResolver2 } from "./IRIResolver2";
export interface ContainerData<TOKEN extends TokenNode> {
    iriResolver: IRIResolver2;
    targetToken: TOKEN;
}
export declare class Container2<TOKEN extends TokenNode> implements ContainerData<TOKEN> {
    readonly iriResolver: IRIResolver2;
    readonly targetToken: TOKEN;
    constructor({ iriResolver, targetToken }: ContainerData<TOKEN>);
}
