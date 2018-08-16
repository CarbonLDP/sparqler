import { Container } from "../../data/Container";
import { RDFLiteralToken } from "../../tokens/RDFLiteralToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { Literal } from "./Literal";
export interface RDFLiteral extends Literal {
    withType(type: string): Literal;
    withLanguage(language: string): Literal;
}
export declare const RDFLiteral: {
    createFrom<C extends Container<SubjectToken<RDFLiteralToken>>, O extends object>(container: C, object: O): O & RDFLiteral;
};
