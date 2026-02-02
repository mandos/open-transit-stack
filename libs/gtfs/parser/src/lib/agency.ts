import { Agency } from '@mandos-dev/gtfs-core';
import { PathLike } from 'node:fs';
import { readCsv } from '@mandos-dev/csv';
// import { readCsv } from '@mandos-dev/csv';

type Parser<T> = (value: string) => T;

const parseString: Parser<string> = v => v;

type AgencyParsers = {
  [K in keyof Agency]: Parser<Agency[K]>;
};

const agencyParsers: AgencyParsers = {
  agency_id: parseString,
  agency_name: parseString,
  agency_url: parseString,
  agency_timezone: parseString,
  agency_lang: parseString,
  agency_phone: parseString,
  agency_fare_url: parseString,
  agency_email: parseString,
  cemv_support: parseString,
};

// TODO: row is type of string[] which is not correct, it because of problem with overloading for readCSV, clean it up later.
export function parseAgency(row: Record<string, string> | string[]): Agency {
  const result: Partial<Agency> = {};
  const errors: string[] = [];
  for (const [key, value] of Object.entries(row)) {
    const parser = agencyParsers[key as keyof Agency];
    if (parser === undefined) {
      errors.push(`Field "${key}" is not part of Agency specification.`);
      continue;
    };
    result[key as keyof Agency] = parser(value);
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
  return result as Agency;
}

export async function readAgencyFeed(feedLocation: PathLike): Promise<Agency[]> {
  const agencies: Agency[] = [];
  for await (const row of readCsv(feedLocation, { header: true })) {
    agencies.push(parseAgency(row));
  }

  return agencies;
};
