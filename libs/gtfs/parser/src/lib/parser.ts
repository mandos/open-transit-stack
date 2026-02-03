import { Latitude, Longitude } from "@mandos-dev/gtfs-core";

export type Parser<T> = (value: string) => T;

export const parseString: Parser<string> = v => v;

export const parseLatitude: Parser<Latitude> = v => {
  const val = Number(v);
  if (!Number.isFinite(val)) {
    throw new Error(`Latitute should be number, got: ${val}`);
  }
  if (val < -90 || val > 90) {
    throw new Error(`Latitute should be between -90 and +90, got: ${val}.`);
  }
  return val
};

export const parseLongitude: Parser<Longitude> = v => {
  const val = Number(v);
  if (!Number.isFinite(val)) {
    throw new Error(`Latitute should be number, got: ${val}`);
  }
  if (val < -180 || val > 180) {
    throw new Error(`Latitute should be between -180 and +180, got: ${val}.`);
  }
  return val
};
