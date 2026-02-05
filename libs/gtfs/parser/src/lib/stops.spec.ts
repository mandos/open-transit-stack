import { parseStops } from "./stops.js";

describe('parseStops', () => {
  describe('parseStops', () => {
    it('should parse all fields', () => {
      const input = {
        stop_id: "moo",
        stop_code: "boo",
        tts_stop_name: "foo",
        stop_desc: "doo",
        stop_lat: "-33.8568",
        stop_lon: "151.2153",
        zone_id: "au",
        stop_url: "http://localhost/stop",
        location_type: "0",
        parent_station: "some",
        stop_timezone: "auau",
        wheelchair_boarding: "2",
        level_id: "id-3",
        platform_code: "platform-3",
        stop_access: "0",
      };
      const expected = {
        stop_id: "moo",
        stop_code: "boo",
        tts_stop_name: "foo",
        stop_desc: "doo",
        stop_lat: -33.8568,
        stop_lon: 151.2153,
        zone_id: "au",
        stop_url: "http://localhost/stop",
        location_type: 0,
        parent_station: "some",
        stop_timezone: "auau",
        wheelchair_boarding: 2,
        level_id: "id-3",
        platform_code: "platform-3",
        stop_access: 0,
      };
      expect(parseStops(input)).toStrictEqual(expected);
    });
  });


});
