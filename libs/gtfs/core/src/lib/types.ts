
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
type UniqueID = string
type Text = string
type TimeZone = string
type LanguageCode = string
type PhoneNumber = string
type Email = string
type URL = string
type CemvSupport = string
// agency_id	Unique ID	Conditionally Required	Identifies a transit brand which is often synonymous with a transit agency. Note that in some cases, such as when a single agency operates multiple separate services, agencies and brands are distinct. This document uses the term "agency" in place of "brand". A dataset may contain data from multiple agencies.
// Conditionally Required:
// - Required when the dataset contains data for multiple transit agencies.
// - Recommended otherwise.
// agency_name	Text	Required	Full name of the transit agency.
// agency_url	URL	Required	URL of the transit agency.
// agency_timezone	Timezone	Required	Timezone where the transit agency is located. If multiple agencies are specified in the dataset, each must have the same agency_timezone.
// agency_lang	Language code	Optional	Primary language used by this transit agency. Should be provided to help GTFS consumers choose capitalization rules and other language-specific settings for the dataset.
// agency_phone	Phone number	Optional	A voice telephone number for the specified agency. This field is a string value that presents the telephone number as typical for the agency's service area. It may contain punctuation marks to group the digits of the number. Dialable text (for example, TriMet's "503-238-RIDE") is permitted, but the field must not contain any other descriptive text.
// agency_fare_url	URL	Optional	URL of a web page where a rider can purchase tickets or other fare instruments for that agency, or a web page containing information about that agency's fares.
// agency_email	Email	Optional	Email address actively monitored by the agency’s customer service department. This email address should be a direct contact point where transit riders can reach a customer service representative at the agency.
// cemv_support	Enum	Optional	Indicates if riders can access a transit service (i.e., trip) associated with this agency by using a contactless EMV (Europay, Mastercard, and Visa) card or mobile device as fare media at a fare validator (such as in pay-as-you-go or open-loop systems). This field does not indicate that cEMV can be used to purchase other fare products or to add value to another fare media.
// Support for cEMVs should only be indicated if all services under this agency are accessible with the use of cEMV cards or mobile devices as fare media.
// Valid options are:
// 0 or empty - No cEMV information for trips associated with this agency.
// 1 - Riders may use cEMVs as fare media for trips associated with this agency.
// 2 - cEMVs are not supported as fare media for trips associated with this agency.

// If both agency.cemv_support and routes.cemv_support are provided for the same service, the value in routes.cemv_support shall take precedence.

// This field is independent of all other fare-related files and may be used separately. If there is conflicting information between this field and any fare-related file (such as fare_media.txt, fare_products.txt, or fare_leg_rules.txt), the information in those files shall take precedence over agency.cemv_support.
export interface Agency {
  agency_id: UniqueID,
  agency_name: Text,
  agency_url: URL,
  agency_timezone: TimeZone,
  agency_lang: LanguageCode,
  agency_phone: PhoneNumber,
  agency_fare_url: URL,
  agency_email: Email,
  cemv_support: CemvSupport,
}
