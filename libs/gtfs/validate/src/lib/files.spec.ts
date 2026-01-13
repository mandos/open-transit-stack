import { validateFilesList } from './files.js';

describe("validateFiles", () => {
  const numberOfKnownGtfsFiles = 32;

  it("should return map with all knows files", () => {
    const inputFiles: string[] = [];

    const validated = validateFilesList(inputFiles);
    expect(validated.size).toEqual(numberOfKnownGtfsFiles);
  });

  it("should mark all present and missing files", () => {
    const inputFiles: string[] = ["agency.txt", "stops.txt"];

    const validated = validateFilesList(inputFiles);
    expect(validated.get('agency.txt')?.status).toBe("present");
    expect(validated.get('stops.txt')?.status).toBe("present");
    expect(validated.get('routes.txt')?.status).toBe("missing");
    expect(validated.get('calendar.txt')?.status).toBe("missing");
  });

  it("should show that file is not on specification list", () => {
    const inputFiles: string[] = ["agency.txt", "stops.txt", "not-in-gtfs.txt"];

    const validated = validateFilesList(inputFiles);
    expect(validated.get('not-in-gtfs.txt')?.status).toBe("unknown");
  });
});
