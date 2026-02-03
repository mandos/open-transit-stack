import { Agency, CemvSupport } from '@mandos-dev/gtfs-core';
import { PathLike } from 'node:fs';
import { readCsv } from '@mandos-dev/csv';
import { Parser, parseString } from './parser.js';

const parseCemvSupport: Parser<CemvSupport> = v => {
  if (v === "") { return undefined };
  const num = Number(v);

  if (!Number.isInteger(num)) {
    throw new Error(`CemvSupport must be integer, got: ${num}`);
  }

  if (num === CemvSupport.Empty ||
    num === CemvSupport.NotSupported ||
    num == CemvSupport.Supported) {
    return num;
  }

  throw new Error(`Value is not correct CemvSupport (0, 1, 2 or empty), got: ${v}`);
};

type AgencyParsers = {
  [K in keyof Agency]-?: Parser<Agency[K]>;
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
  cemv_support: parseCemvSupport,
};

// TODO: row is type of string[] which is not correct, it because of problem with overloading for readCSV, clean it up later.
export function parseAgency(row: Record<string, string> | string[]): Agency {
  if (Array.isArray(row)) {
    throw new Error(`Parsing Agency works only on Records, not Arrays.`);
  }
  const result: Partial<Agency> = {};
  const errors: string[] = [];
  for (const key of Object.keys(row)) {
    if (!(key in agencyParsers)) {
      errors.push(`Field "${key}" is not part of Agency specification.`);
    }
  };
  for (const key of Object.keys(agencyParsers) as (keyof Agency)[]) {
    const value = row[key];
    if (value === undefined) continue;
    try {
      (result as Record<keyof Agency, unknown>)[key] = agencyParsers[key](value);
    } catch (err) {
      errors.push(`Field "${key}": ${(err as Error).message}`);
    }
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
