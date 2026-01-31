import { Agency } from '@mandos-dev/gtfs-core';
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


export function parseAgency(row: Record<string, string>): Agency {
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
// export function readAgencyFeed(feedDir: string) {
//   console.log(feedDir);
// };
//

// export function parseAgencyFeed(csvText: string): Agency[] {
//   const agencies: Agency[] = [];

//   for (const row of readCsv(csvText, { header: true })) {
//     agencies.push(row);
//   }

//   return agencies
// }
