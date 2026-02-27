import { useState } from 'react';
import { unzipSync } from 'fflate';
import { parseCsvText } from '@mandos-dev/csv';
import { parseStops } from '@mandos-dev/gtfs-parser';
import { Stops } from '@mandos-dev/gtfs-core';

type UploadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; stops: Stops[] };

function findStopsTxt(
  files: Record<string, Uint8Array>
): Uint8Array | undefined {
  for (const key of Object.keys(files)) {
    if (key.endsWith('stops.txt')) {
      return files[key];
    }
  }
  return undefined;
}

export function useGtfsUpload() {
  const [state, setState] = useState<UploadState>({ status: 'idle' });

  function handleFile(file: File) {
    setState({ status: 'loading' });

    const reader = new FileReader();
    reader.onerror = () => {
      setState({ status: 'error', message: 'Failed to read file.' });
    };
    reader.onload = () => {
      try {
        const buffer = new Uint8Array(reader.result as ArrayBuffer);
        const files = unzipSync(buffer);
        const stopsData = findStopsTxt(files);

        if (!stopsData) {
          setState({ status: 'error', message: 'No stops.txt found in zip.' });
          return;
        }

        const text = new TextDecoder().decode(stopsData);
        const records = parseCsvText(text);
        // TODO: Add managing errors (parseStops can throw Exception if data cannot be parsed)
        const stops: Stops[] = records.map(r => parseStops(r));

        setState({ status: 'success', stops });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to process zip file.';
        setState({ status: 'error', message });
      }
    };
    reader.readAsArrayBuffer(file);
  }

  return { state, handleFile } as const;
}
