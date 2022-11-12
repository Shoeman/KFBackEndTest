import {filterOutages} from "../../../src/processing/outageFilter";


describe('filterOutages', () => {

    it('should handle empty', function () {
        expect(filterOutages([])).toEqual([]);
    });

    it('should filter outages that begin before the threshold time', function () {
        const input = [
            {
                "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                "begin": "2021-07-26T17:09:31.036Z",
                "end": "2021-08-29T00:37:42.253Z"
            },
            {
                "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                "begin": "2022-05-23T12:21:27.377Z",
                "end": "2022-11-13T02:16:38.905Z"
            }
        ];
        const expected = [
            {
                "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                "begin": "2022-05-23T12:21:27.377Z",
                "end": "2022-11-13T02:16:38.905Z"
            }
        ]
        expect(filterOutages(input)).toEqual(expected);
    });

    it('should handle edge case begin dates', function () {
        const input = [
            {
                "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                "begin": "2021-12-31T23:59:59.999Z",
                "end": "2022-01-01T00:00:00.000Z"
            },
            {
                "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                "begin": "2022-01-01T00:00:00.000Z",
                "end": "2022-11-13T02:16:38.905Z"
            },
            {
                "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                "begin": "2022-01-01T00:00:00.001Z",
                "end": "2022-11-13T02:16:38.905Z"
            }
        ];
        const expected = [
            {
                "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                "begin": "2022-01-01T00:00:00.000Z",
                "end": "2022-11-13T02:16:38.905Z"
            },
            {
                "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                "begin": "2022-01-01T00:00:00.001Z",
                "end": "2022-11-13T02:16:38.905Z"
            }
        ]
        expect(filterOutages(input)).toEqual(expected);
    });
});