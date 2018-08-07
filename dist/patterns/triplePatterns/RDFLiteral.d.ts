import { Container2 } from "../../data/Container2";
import { LiteralToken } from "../../tokens/LiteralToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { Literal } from "./Literal";
export interface RDFLiteral extends Literal {
    withType(type: string): Literal;
    withLanguage(language: string): Literal;
}
export declare const RDFLiteral: {
    createFrom<C extends Container2<SubjectToken<LiteralToken>>, O extends object>(container: C, object: O): O & RDFLiteral;
};
