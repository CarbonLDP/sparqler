import { build } from "./tools/gulp/build";

export default build;

export {
	build,
} from "./tools/gulp/build";

export {
	buildCJS,
	buildESM2015,
	buildESM5,
	buildTypes,
} from "./tools/gulp/typescript";

export {
	bundle,
	bundleUMD,
} from "./tools/gulp/rollup"

export {
	preparePackage,
	copyMarkdowns,
	copyPackage,
	makeDirPackages,
} from "./tools/gulp/packages";

export {
	test,
	testBrowser,
	testNode,
	testWatch,
} from "./tools/gulp/tests";
