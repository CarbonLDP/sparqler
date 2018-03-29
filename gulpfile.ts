import { build } from "./tools/gulp/build";

export default build;

export {
	build
} from "./tools/gulp/build";
export {
	compileAll,
	compileCJS,
	compileESM2015,
	compileESM5,
} from "./tools/gulp/typescript";

