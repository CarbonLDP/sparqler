import { build } from "./tasks/build";

export default build;

export {
	build,
} from "./tasks/build";

export {
	buildCJS,
	buildESM2015,
	buildESM5,
	buildTypes,
} from "./tasks/typescript";

export {
	bundle,
	bundleUMD,
} from "./tasks/rollup"

export {
	preparePackage,
	copyMarkdowns,
	copyPackage,
	makeDirPackages,
} from "./tasks/packages";

export {
	test,
	testBrowser,
	testNode,
	testWatch,
} from "./tasks/tests";

export {
	docsBuildDev,
	docsBuildProd,
} from "./tasks/docs"
