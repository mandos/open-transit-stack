import { ParsedInput } from '../cli/cli.js'

const rules = {
  "agency.txt": "required",
  "stops.txt": "required",
  "routes.txt": "required",
  "trips.txt": "required",
  "stop_times.txt": "required",
  "calendar.txt": "required",
  "calendar_dates.txt": "required",
  "fare_attributes.txt": "required",
  "fare_rules.txt": "required",
  "timeframes.txt": "required",
  "rider_categories.txt": "required",
  "fare_media.txt": "required",
  "fare_products.txt": "required",
  "fare_leg_rules.txt": "required",
  "fare_leg_join_rules.txt": "required",
  "fare_transfer_rules.txt": "required",
  "areas.txt": "required",
  "stop_areas.txt": "required",
  "networks.txt": "required",
  "route_networks.txt": "required",
  "shapes.txt": "required",
  "frequencies.txt": "required",
  "transfers.txt": "required",
  "pathways.txt": "required",
  "levels.txt": "required",
  "location_groups.txt": "required",
  "location_group_stops.txt": "required",
  "locations.geojson": "required",
  "booking_rules.txt": "required",
  "translations.txt": "required",
  "feed_info.txt": "required",
  "attributions.txt": "required",
}

export async function run(input: ParsedInput): Promise<number> {
  // TODO: Load zip and unzip it somewere
  // TODO: Get list of folders and check all validation rules for them
  // TODO: Print list of validation result
  // TODO: Return 0 if all is ok, return Failure if some validation rule didn't pass
  return 42
}
