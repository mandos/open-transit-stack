import { useState } from 'react';
import { unzipSync } from 'fflate';
import { parseCsvText } from '@mandos-dev/csv';

export interface ParsedStop {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
}

type UploadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; stops: ParsedStop[] };

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
        const stops: ParsedStop[] = records.map((r) => ({
          stop_id: r['stop_id'] ?? '',
          stop_name: r['stop_name'] ?? '',
          stop_lat: r['stop_lat'] ?? '',
          stop_lon: r['stop_lon'] ?? '',
        }));

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
