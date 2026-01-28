import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as AttachmentCollectionFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Attachment collection filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 13 |
* | **All Fields Nullable** | Yes |
*/
export interface AttachmentCollectionFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Comparator for the identifier.
*/
id?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IDComparator<_$Context> | null | undefined>,
/**
* Comparator for the created at date.
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the updated at date.
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the title.
*/
title?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the subtitle.
*/
subtitle?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableStringComparator<_$Context> | null | undefined>,
/**
* Comparator for the url.
*/
url?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Filters that the attachments creator must satisfy.
*/
creator?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>,
/**
* Comparator for the source type.
*/
sourceType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SourceTypeComparator<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the attachment.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AttachmentCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the attachment.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AttachmentCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Filters that needs to be matched by some attachments.
*/
some?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AttachmentFilter<_$Context> | null | undefined>,
/**
* Filters that needs to be matched by all attachments.
*/
every?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AttachmentFilter<_$Context> | null | undefined>,
/**
* Comparator for the collection length.
*/
length?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>
}