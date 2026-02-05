import { UniqueID, Text, URL, TimeZone, Latitude, Longitude, ID } from '../types.js';

// NOTE: Specification from: https://gtfs.org/documentation/schedule/reference/#stopstxt */

export const LocationType = {
  StopOrPlatform: 0,
  EntranceExit: 1,
  GenericNode: 2,
  BoardingArea: 4,
} as const;
type LocationType = typeof LocationType[keyof typeof LocationType];

// TODO: For now I'm using simplify modeling of WheelchairBoarding (enough for parsing), but it should be expand according spec,
// (three different types, conditionals, etc)
export const WheelchairBoardingAll = {
  NoInformation: 0,
  SomeAccess: 1,
  NoAccess: 2,
} as const;
type WheelchairBoarding =
  typeof WheelchairBoardingAll[keyof typeof WheelchairBoardingAll];

export const StopAccess = {
  ViaStation: 0,
  Direct: 1,
} as const;
export type StopAccess = typeof StopAccess[keyof typeof StopAccess];

export interface Stops {
  stop_id: UniqueID,
  stop_code?: Text,
  stop_name?: Text,
  tts_stop_name?: Text,
  stop_desc: Text,
  stop_lat?: Latitude,
  stop_lon?: Longitude,
  zone_id?: ID,
  stop_url: URL,
  location_type?: LocationType,
  parent_station?: UniqueID,
  stop_timezone?: TimeZone,
  wheelchair_boarding?: WheelchairBoarding,
  level_id?: UniqueID,
  platform_code?: Text,
  stop_access?: StopAccess,
}
