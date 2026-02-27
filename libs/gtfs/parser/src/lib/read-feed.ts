import { readCsv } from "@mandos-dev/csv/node";
import { Agency, Stops } from "@mandos-dev/gtfs-core";
import { PathLike } from "node:fs";
import { parseAgency } from "./agency.js";
import { parseStops } from "./stops.js";

export async function readAgencyFeed(feedLocation: PathLike): Promise<Agency[]> {
  const agencies: Agency[] = [];
  for await (const row of readCsv(feedLocation, { header: true })) {
    agencies.push(parseAgency(row));
  }
  return agencies;
};

export async function readStopsFeed(feedLocation: PathLike): Promise<Stops[]> {
  const agencies: Stops[] = [];
  for await (const row of readCsv(feedLocation, { header: true })) {
    agencies.push(parseStops(row));
  }
  return agencies;
};
