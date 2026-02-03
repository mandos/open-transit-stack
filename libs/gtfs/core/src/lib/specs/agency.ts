import { UniqueID, Text, URL, TimeZone, LanguageCode, PhoneNumber, Email } from '../types.js'

// NOTE: Specification from: https://gtfs.org/documentation/schedule/reference/#agencytxt
//
export const CemvSupport = {
  Empty: 0,
  Supported: 1,
  NotSupported: 2,
} as const;

export type CemvSupport =
  | typeof CemvSupport[keyof typeof CemvSupport]
  | undefined;

export interface Agency {
  agency_id: UniqueID,
  agency_name: Text,
  agency_url: URL,
  agency_timezone: TimeZone,
  agency_lang?: LanguageCode,
  agency_phone?: PhoneNumber,
  agency_fare_url?: URL,
  agency_email?: Email,
  cemv_support?: CemvSupport,
}
