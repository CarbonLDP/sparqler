import del from "del";


export interface TaskFn extends Function {
	displayName?:string;
}


export const tasker = <T extends TaskFn>( fn?:T ) => ( name?:string ) => {
	if( typeof name !== "string" ) return fn.call( this, name );

	fn.displayName = name;
	return fn;
};


const SRC:string = "src/";
const DIST:string = "dist/";

const PATHS = {
	src: {
		dir: SRC,
		files: [
			`${ SRC }**/*.ts`,
			`!${ SRC }**/*.spec.ts`,
		],
	},
	dist: {
		dir: DIST,
		esm2015: `${ DIST }.esm2015/`,
		esm5: `${ DIST }.esm5/`,
		cjs: `${ DIST }.cjs/`,
	},
};


export const CONFIG = {
	...PATHS,
};


export const cleaner = ( path:string | string[] ) => tasker( () => del( path ) );
