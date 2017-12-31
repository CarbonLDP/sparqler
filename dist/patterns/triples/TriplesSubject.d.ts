import { GraphPattern } from "../interfaces";
import { TriplesPattern } from "./TriplesPattern";
export declare abstract class TriplesSubject extends TriplesPattern<GraphPattern> {
    protected init(): void;
}
export default TriplesSubject;
