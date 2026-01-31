import { parseAgency } from './agency.js';
// import * as fs from 'node:fs/promises';

describe('parseAgencyRow', () => {
  it('should return Agency where all fields are presented', () => {
    const input = {
      agency_id: "bea61a6d-b545-4395-acc8-97d98ced9691",
      agency_name: "boo",
      agency_url: "http://localhost",
      agency_timezone: "Japan/Tokyo",
      agency_lang: "jp",
      agency_phone: "777",
      agency_fare_url: "http://localhost/fare",
      agency_email: "moo@boo.org",
      cemv_support: "0",
    };
    const expected = {
      agency_id: "bea61a6d-b545-4395-acc8-97d98ced9691",
      agency_name: "boo",
      agency_url: "http://localhost",
      agency_timezone: "Japan/Tokyo",
      agency_lang: "jp",
      agency_phone: "777",
      agency_fare_url: "http://localhost/fare",
      agency_email: "moo@boo.org",
      cemv_support: "0",
    };

    expect(parseAgency(input)).toStrictEqual(expected);

  });

  it('should return Agency where required fields are presented', () => {
    const input = {
      agency_id: "bea61a6d-b545-4395-acc8-97d98ced9691",
      agency_name: "boo",
      agency_url: "http://localhost",
      agency_timezone: "Japan/Tokyo",
    };
    const expected = {
      agency_id: "bea61a6d-b545-4395-acc8-97d98ced9691",
      agency_name: "boo",
      agency_url: "http://localhost",
      agency_timezone: "Japan/Tokyo",
    };
    expect(parseAgency(input)).toStrictEqual(expected);
  });

  it('should return error if uknown fields are in input', () => {
    const input = {
      agency_id: "bea61a6d-b545-4395-acc8-97d98ced9691",
      agency_name: "boo",
      agency_url: "http://localhost",
      agency_timezone: "Japan/Tokyo",
      i_dont_know_you: "its mistake",
      and_this_one_too: "its mistake",
    };
    expect(() => parseAgency(input)).toThrowError(/i_dont_know_you.*and_this_one_too/s);
  });
});


// function asyncLines(lines: string[]): AsyncIterable<string> {
//   return {
//     async *[Symbol.asyncIterator]() {
//       for (const line of lines) {
//         yield line;
//       }
//     }
//   };
// }

// export function mockReadLines(lines: string[]) {
//   const close = vi.fn().mockResolvedValue(undefined);
//   vi.mock('node:fs/promises', () => ({
//     open: vi.fn(),
//   }));

//   vi.mocked(fs.open).mockResolvedValue({
//     readLines: () => asyncLines(lines),
//     close,
//   } as any);
// }

// describe('readAgencyFeed', () => {
//   it('should return list of objects', async () => {
//     const csvLines = [
//       'agency_id,agency_name,agency_url,agency_timezone,agency_lang',
//       '1,2,3,4,5',
//       '6,7,8,9,0',
//     ];
//     const expected = [
//       {
//         agency_id: "1",
//         agency_name: "2",
//         agency_url: "3",
//         agency_timezone: "4",
//         agency_lang: "5",
//       },
//       {
//         agency_id: "6",
//         agency_name: "7",
//         agency_url: "8",
//         agency_timezone: "9",
//         agency_lang: "0",
//       }
//     ];

//     mockReadLines(csvLines);

//     await expect(readAgencyFeed('/tmp')).resolves.toStrictEqual(expected);

//   });
// });
