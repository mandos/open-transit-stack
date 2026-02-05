import { parseAgency } from './agency.js';
// import * as fs from 'node:fs/promises';

describe('parseAgency', () => {
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
      cemv_support: 0,
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

// REVIEW: I'm not sure if I want to write this test, and if I want, should I stub readCsv function?
describe.todo('readAgencyFeed', () => {
  console.log("To implement");
});
