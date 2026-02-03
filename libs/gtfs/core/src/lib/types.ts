
export type Condition =
  | { kind: "fileExists", file: string };

export type FileRequirement =
  | { type: "required" }
  | { type: "optional" }
  | {
    type: "conditional";
    condition: Condition;
  };

export const GTFS_FILES = new Map([
  ["agency.txt", { requirement: "required" }],
  ["areas.txt", { requirement: "required" }],
  ["attributions.txt", { requirement: "required" }],
  ["booking_rules.txt", { requirement: "required" }],
  ["calendar_dates.txt", { requirement: "required" }],
  ["calendar.txt", { requirement: "required" }],
  ["fare_attributes.txt", { requirement: "required" }],
  ["fare_leg_join_rules.txt", { requirement: "required" }],
  ["fare_leg_rules.txt", { requirement: "required" }],
  ["fare_media.txt", { requirement: "required" }],
  ["fare_products.txt", { requirement: "required" }],
  ["fare_rules.txt", { requirement: "required" }],
  ["fare_transfer_rules.txt", { requirement: "required" }],
  ["feed_info.txt", { requirement: "required" }],
  ["frequencies.txt", { requirement: "required" }],
  ["levels.txt", { requirement: "required" }],
  ["location_group_stops.txt", { requirement: "required" }],
  ["location_groups.txt", { requirement: "required" }],
  ["locations.geojson", { requirement: "required" }],
  ["networks.txt", { requirement: "required" }],
  ["pathways.txt", { requirement: "required" }],
  ["rider_categories.txt", { requirement: "required" }],
  ["route_networks.txt", { requirement: "required" }],
  ["routes.txt", { requirement: "required" }],
  ["shapes.txt", { requirement: "required" }],
  ["stop_areas.txt", { requirement: "required" }],
  ["stops.txt", { requirement: "required" }],
  ["stop_times.txt", { requirement: "required" }],
  ["timeframes.txt", { requirement: "required" }],
  ["transfers.txt", { requirement: "required" }],
  ["translations.txt", { requirement: "required" }],
  ["trips.txt", { requirement: "required" }],
]);

// TODO: Use better types
export type UniqueID = string
export type ID = string;
export type Text = string
export type TimeZone = string
export type LanguageCode = string
export type PhoneNumber = string
export type Email = string
export type URL = string
export type Latitude = number
export type Longitude = number
