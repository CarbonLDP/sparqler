import { TokenNode } from "../tokens/TokenNode";
import { IRIResolver } from "./IRIResolver";
export interface ContainerData<TOKEN extends TokenNode | undefined> {
    iriResolver: IRIResolver;
    targetToken: TOKEN;
}
export declare class Container<TOKEN extends TokenNode | undefined> implements ContainerData<TOKEN> {
    readonly iriResolver: IRIResolver;
    readonly targetToken: TOKEN;
    constructor(data: ContainerData<TOKEN>);
}
