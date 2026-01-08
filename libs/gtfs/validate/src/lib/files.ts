import { GTFS_FILES } from "@mandos-dev/gtfs-core";

type FileStatus = {
  status: "present" | "missing" | "unknown"
}

export function validateFiles(files: string[]): Map<string, FileStatus> {
  const validated = new Map<string, FileStatus>;

  // console.log(GTFS_FILES);
  for (const file of GTFS_FILES.keys()) {
    validated.set(file, { status: "missing" });
  }

  for (const file of files) {
    if (GTFS_FILES.get(file)) {
      validated.set(file, { status: "present" });
    } else {
      validated.set(file, { status: "unknown" });
    }
  }

  return validated;
}
