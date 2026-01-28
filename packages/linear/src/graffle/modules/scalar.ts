import * as $$Utilities from 'graffle/utilities-for-generated'
export * from 'graffle/generator-helpers/standard-scalar-types'

//
    //
    //
    //
    // CUSTOM SCALAR TYPE
    // DATETIME
    // --------------------------------------------------------------------------------------------------
    //                                              DateTime
    // --------------------------------------------------------------------------------------------------
    //
    //

export const DateTime = { kind: 'Scalar', name: 'DateTime', codec: $$Utilities.Codec.create({ encode: (value: any) => String(value), decode: (value: any) => String(value) }) } as $$Utilities.GraphqlKit.Schema.Type.Scalar<'DateTime', string, string>
export type DateTime = $$Utilities.GraphqlKit.Schema.Type.Scalar<'DateTime', string, string>
//
    //
    //
    //
    // CUSTOM SCALAR TYPE
    // TIMELESSDATE
    // --------------------------------------------------------------------------------------------------
    //                                            TimelessDate
    // --------------------------------------------------------------------------------------------------
    //
    //

export const TimelessDate = { kind: 'Scalar', name: 'TimelessDate', codec: $$Utilities.Codec.create({ encode: (value: any) => String(value), decode: (value: any) => String(value) }) } as $$Utilities.GraphqlKit.Schema.Type.Scalar<'TimelessDate', string, string>
export type TimelessDate = $$Utilities.GraphqlKit.Schema.Type.Scalar<'TimelessDate', string, string>
//
    //
    //
    //
    // CUSTOM SCALAR TYPE
    // JSONOBJECT
    // --------------------------------------------------------------------------------------------------
    //                                             JSONObject
    // --------------------------------------------------------------------------------------------------
    //
    //

export const JSONObject = { kind: 'Scalar', name: 'JSONObject', codec: $$Utilities.Codec.create({ encode: (value: any) => String(value), decode: (value: any) => String(value) }) } as $$Utilities.GraphqlKit.Schema.Type.Scalar<'JSONObject', string, string>
export type JSONObject = $$Utilities.GraphqlKit.Schema.Type.Scalar<'JSONObject', string, string>
//
    //
    //
    //
    // CUSTOM SCALAR TYPE
    // DATETIMEORDURATION
    // --------------------------------------------------------------------------------------------------
    //                                         DateTimeOrDuration
    // --------------------------------------------------------------------------------------------------
    //
    //

export const DateTimeOrDuration = { kind: 'Scalar', name: 'DateTimeOrDuration', codec: $$Utilities.Codec.create({ encode: (value: any) => String(value), decode: (value: any) => String(value) }) } as $$Utilities.GraphqlKit.Schema.Type.Scalar<'DateTimeOrDuration', string, string>
export type DateTimeOrDuration = $$Utilities.GraphqlKit.Schema.Type.Scalar<'DateTimeOrDuration', string, string>
//
    //
    //
    //
    // CUSTOM SCALAR TYPE
    // TIMELESSDATEORDURATION
    // --------------------------------------------------------------------------------------------------
    //                                       TimelessDateOrDuration
    // --------------------------------------------------------------------------------------------------
    //
    //

export const TimelessDateOrDuration = { kind: 'Scalar', name: 'TimelessDateOrDuration', codec: $$Utilities.Codec.create({ encode: (value: any) => String(value), decode: (value: any) => String(value) }) } as $$Utilities.GraphqlKit.Schema.Type.Scalar<'TimelessDateOrDuration', string, string>
export type TimelessDateOrDuration = $$Utilities.GraphqlKit.Schema.Type.Scalar<'TimelessDateOrDuration', string, string>
//
    //
    //
    //
    // CUSTOM SCALAR TYPE
    // DURATION
    // --------------------------------------------------------------------------------------------------
    //                                              Duration
    // --------------------------------------------------------------------------------------------------
    //
    //

export const Duration = { kind: 'Scalar', name: 'Duration', codec: $$Utilities.Codec.create({ encode: (value: any) => String(value), decode: (value: any) => String(value) }) } as $$Utilities.GraphqlKit.Schema.Type.Scalar<'Duration', string, string>
export type Duration = $$Utilities.GraphqlKit.Schema.Type.Scalar<'Duration', string, string>
//
    //
    //
    //
    // CUSTOM SCALAR TYPE
    // JSON
    // --------------------------------------------------------------------------------------------------
    //                                                JSON
    // --------------------------------------------------------------------------------------------------
    //
    //

export const JSON = { kind: 'Scalar', name: 'JSON', codec: $$Utilities.Codec.create({ encode: (value: any) => String(value), decode: (value: any) => String(value) }) } as $$Utilities.GraphqlKit.Schema.Type.Scalar<'JSON', string, string>
export type JSON = $$Utilities.GraphqlKit.Schema.Type.Scalar<'JSON', string, string>
//
    //
    //
    //
    // CUSTOM SCALAR TYPE
    // UUID
    // --------------------------------------------------------------------------------------------------
    //                                                UUID
    // --------------------------------------------------------------------------------------------------
    //
    //

export const UUID = { kind: 'Scalar', name: 'UUID', codec: $$Utilities.Codec.create({ encode: (value: any) => String(value), decode: (value: any) => String(value) }) } as $$Utilities.GraphqlKit.Schema.Type.Scalar<'UUID', string, string>
export type UUID = $$Utilities.GraphqlKit.Schema.Type.Scalar<'UUID', string, string>


    //
    //
    //
    //
    //
    //
    // ==================================================================================================
    //                                              Registry
    // ==================================================================================================
    //
    //
    //
    //
    //
    //


/**
* Runtime registry of custom scalar codecs.
*
* Maps scalar type names to their codec implementations for encoding/decoding.
*/

      export const $registry = {
        map: {},
      } as $Registry


/**
* Type-level registry of custom scalars.
*
* Provides type information about custom scalars for the type system.
*/
export type $Registry = $$Utilities.Schema.Scalars.Registry.Empty