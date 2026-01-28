import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type organization<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organization.$SelectionSet<_$Context>

export namespace organization {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuthOrganization<_$Context> {
}

/**
* This is the "expanded" version of the `organization` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type user<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = user.$SelectionSet<_$Context>

export namespace user {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuthUser<_$Context> {
}

/**
* This is the "expanded" version of the `user` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}

