import { Output } from "./common.js";

export interface Writer<T> {
  write(data: T, output: Output): void | Promise<void>;
}

export class JsonWriter<T> implements Writer<T> {
  constructor(private readonly pretty = false) {}

  write(data: T, output: Output): void | Promise<void> {
    const json = JSON.stringify(
      data,
      null,
      this.pretty ? 2 : undefined,
    );

    output.out(json);
  };
}

export type WriterFactory = <T>() => Writer<T>;

export function createWriterFactory(format: "json"): WriterFactory {
  switch (format) {
    case 'json':
      return <T>() => new JsonWriter<T>(true);

    default:
      throw new Error(`Unknown format for writer: ${format}`);
  }
};
