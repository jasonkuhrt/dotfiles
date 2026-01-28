import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotionSettingsInput}.
*
* The ID of the Notion workspace being connected.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotionSettingsInput} |
* | **Path** | `NotionSettingsInput.workspaceId` |
* | **Nullability** | Required |
*/
export interface workspaceId {
kind: "InputField",
name: "workspaceId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotionSettingsInput}.
*
* The name of the Notion workspace being connected.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotionSettingsInput} |
* | **Path** | `NotionSettingsInput.workspaceName` |
* | **Nullability** | Required |
*/
export interface workspaceName {
kind: "InputField",
name: "workspaceName",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}