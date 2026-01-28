import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GongSettingsInput}.
*
* Configuration for recording import.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GongRecordingImportConfigInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.GongSettingsInput} |
* | **Path** | `GongSettingsInput.importConfig` |
* | **Nullability** | Optional |
*/
export interface importConfig {
kind: "InputField",
name: "importConfig",
inlineType: [0, ],
namedType: $Schema.GongRecordingImportConfigInput,
type: $Schema.GongRecordingImportConfigInput['type'] | null | undefined
}