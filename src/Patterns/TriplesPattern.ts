import {
	TriplesSameSubject,
	TriplesSameSubjectMore,
	supportedNativeTypes,
	TriplesNodePattern,
	IRIResolver,
	GraphPattern
} from "../Patterns";
import { Literal } from "./Literals";
import { Resource } from "./Resource";
import * as PatternObject from "../Utils/PatternObject";
import { Variable } from "./Variable";

export abstract class TriplesPattern<T extends GraphPattern> implements TriplesSameSubject<T> {

	protected abstract _subject:string;
	protected _triplesData:string[];

	protected interfaces:{
		addPattern:TriplesSameSubjectMore<T>;
		graphPattern?:T
	};

	private resolver:IRIResolver;

	constructor( resolver:IRIResolver ) {
		this.resolver = resolver;
		this._triplesData = [];
		this.init();
	}

	has( propertyIRI:string, value:supportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, resource:Resource ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, variable:Variable ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, literal:Literal ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, value:supportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, resource:Resource ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, variable:Variable ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, literal:Literal ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;
	has( propertyIRIOrVariable:string | Variable , valueOrValues ):TriplesSameSubjectMore<T> & T {
		let property:string = ( typeof propertyIRIOrVariable === "string" || propertyIRIOrVariable instanceof String )
			? this.resolver._resolveIRI( propertyIRIOrVariable as string, true )
			: propertyIRIOrVariable + "";

		let objects:string[] = Array.isArray( valueOrValues )
			? valueOrValues
			: [ valueOrValues ];

		this._triplesData.push( `${ property } ${ objects.map( PatternObject.serialize ).join( ", " ) }` );

		return Object.assign( {}, this.interfaces.addPattern, this.interfaces.graphPattern );
	}

	toString():string {
		return this._subject;
	}

	private init():void {
		this.interfaces = {
			addPattern: {
				and: this.has.bind( this ),
			},
		};
	};
}

export default TriplesPattern;
