import { Container } from "../../core/containers/Container";

import { PathAlternativeToken } from "../../tokens/PathAlternativeToken";
import { PathInNegatedToken } from "../../tokens/PathInNegatedToken";
import { PathToken } from "../../tokens/PathToken";
import { SubPathInNegatedToken } from "../../tokens/SubPathInNegatedToken";

import { DeniableFluentPath } from "./DeniableFluentPath";
import { FluentPath } from "./FluentPath";


/**
 * Extension of the {@link Container} class that adds the factories
 * that construct {@link FluentPath}'s.
 *
 * The factories are provided from the container to avoid circular
 * dependency when imported directly in the fluent functions of the
 * paths builder and objects.
 */
export interface FluentPathContainer<T extends PathToken | undefined> extends Container<T> {
	fluentPathFactory:<W extends PathToken, O extends object>( container:FluentPathContainer<W>, object:O ) => O & FluentPath<W>;
	deniableFluentPathFactory:<W extends PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>, O extends object>( container:FluentPathContainer<W>, object:O ) => O & DeniableFluentPath<W>;
}
