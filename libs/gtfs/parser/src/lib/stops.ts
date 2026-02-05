import { LocationType, StopAccess, Stops, WheelchairBoardingAll } from "@mandos-dev/gtfs-core";
import { parseLatitude, parseLongitude, createEnumParser, ParserSpec, parseSchema } from "./parser.js";
import { PathLike } from "node:fs";
import { readCsv } from "@mandos-dev/csv";

const stopsSpec: ParserSpec<Stops> = {
  fields: {
    stop_id: { parser: String },
    stop_code: { parser: String },
    stop_name: { parser: String },
    tts_stop_name: { parser: String },
    stop_desc: { parser: String },
    stop_lat: { parser: parseLatitude },
    stop_lon: { parser: parseLongitude },
    zone_id: { parser: String },
    stop_url: { parser: String },
    location_type: { parser: createEnumParser(LocationType) },
    parent_station: { parser: String },
    stop_timezone: { parser: String },
    wheelchair_boarding: { parser: createEnumParser(WheelchairBoardingAll) },
    level_id: { parser: String },
    platform_code: { parser: String },
    stop_access: { parser: createEnumParser(StopAccess) },
  },
  build: (data) => {
    return data as Stops;
  }
};

// REVIEW: row is type of string[] which is not correct, it because of problem with overloading for readCSV, clean it up later.
export function parseStops(row: Record<string, string> | string[]): Stops {
  if (Array.isArray(row)) {
    throw new Error(`Parsing Agency works only on Records, not Arrays.`);
  }
  return parseSchema(row, stopsSpec);
}

export async function readStopsFeed(feedLocation: PathLike): Promise<Stops[]> {
  const agencies: Stops[] = [];
  for await (const row of readCsv(feedLocation, { header: true })) {
    agencies.push(parseStops(row));
  }
  return agencies;
};
