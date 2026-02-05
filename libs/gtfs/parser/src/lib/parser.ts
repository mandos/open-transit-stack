import { Float, Latitude, Longitude } from "@mandos-dev/gtfs-core";

export type Parser<T> = (value: string) => T;

export const parseString: Parser<string> = v => v;

export const parseBoolean: Parser<boolean> = v => {
  if (v === "true"
    || v === "1"
    || v === "yes") {
    return true;
  } else if (v === "false"
    || v === "0"
    || v === "no") {
    return false;
  };
  throw new Error(`Cannot recognize value as boolean, only allowed values are "true", "false", "1", "0", "yes", "no", got: ${v}`);
};

export const parseLatitude: Parser<Latitude> = v => {
  const val = Number(v);
  if (!Number.isFinite(val)) {
    throw new Error(`Latitute should be number, got: ${val}`);
  }
  if (val < -90 || val > 90) {
    throw new Error(`Latitute should be between -90 and +90, got: ${val}.`);
  }
  return val;
};

export const parseLongitude: Parser<Longitude> = v => {
  const val = Number(v);
  if (!Number.isFinite(val)) {
    throw new Error(`Latitute should be number, got: ${val}`);
  }
  if (val < -180 || val > 180) {
    throw new Error(`Latitute should be between -180 and +180, got: ${val}.`);
  }
  return val;
};

// TODO: Is it problem that I overide this function? Maybe not if it used only in this lib internally. To verify if I export it as public API.
export const parseFloat: Parser<Float> = v => {
  const val = Number(v);
  // NOTE: I verify if string are the same, but to do it, I need to trim and remove zeros from end, which is lost in translation
  // REVIEW: Conside if string comparation is needed.
  if (!Number.isFinite(val) || String(val) !== v.trim().replace(/\.0+$/, "")) throw new Error(`"${v}" is not a float type.`);
  return val;
};

// REVIEW: I don't understand this magic
type EnumLike = Record<string, number>;
type EnumValue<E extends EnumLike> = E[keyof E];
export const createEnumParser = <E extends EnumLike>(enumObj: E): Parser<EnumValue<E>> => {
  return (val: string) => {
    const num = Number(val);
    // runtime guard
    if (!Object.values(enumObj).includes(num as EnumValue<E>)) {
      throw new Error(`Invalid enum value: ${val}`);
    }
    return num as EnumValue<E>;
  };
};

type FieldSpec<T> = {
  parser: (value: string) => T;
}

export type ParserSpec<T> = {
  fields: { [K in keyof T]?: FieldSpec<T[K]> },
  build: (data: Partial<T>) => T;
}

export function parseSchema<T>(data: any, schema: ParserSpec<T>): T {
  const errors: string[] = [];
  // REVIEW: This validation is based on ParserSpec not Object's Schema, should be with Object schema (type/interface).
  // I cannot think about different way but if I miss some fields in Spec this can fail without reason.
  for (const field of Object.keys(data) as (keyof T)[]) {
    if (!schema.fields[field]) {
      errors.push(`${String(field)} is not in object's schema.`);
    }
  }

  const parsedData: Partial<T> = {};
  for (const [field, fieldSpec] of Object.entries(schema.fields) as [keyof T, FieldSpec<T[keyof T]>][]) {
    // "optional" field missing in data
    if (!data[field]) continue;
    const parser = fieldSpec.parser;
    try {
      parsedData[field] = parser(data[field]);
    } catch (err) {
      errors.push((err instanceof Error) ? err.message : String(err));
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
  return schema.build(parsedData);
}
