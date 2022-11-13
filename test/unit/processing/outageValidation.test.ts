import {validOutage} from "../../../src/processing/outageValidation";


describe('validOutage', () => {

    it('should reject outage beginning before threshold date', function () {
        const input = {
            "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
            "begin": "2021-07-26T17:09:31.036Z",
            "end": "2021-08-29T00:37:42.253Z"
        };
        expect(validOutage(input)).toBe(false);
    });

    it('should reject outage beginning just before threshold date', function () {
        const input = {
            "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
            "begin": "2021-12-31T23:59:59.999Z",
            "end": "2022-01-01T00:00:00.000Z"
        };
        expect(validOutage(input)).toBe(false);
    });

    it('should accept outage beginning on the threshold date', function () {
        const input = {
            "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
            "begin": "2022-01-01T00:00:00.000Z",
            "end": "2022-11-13T02:16:38.905Z"
        };
        expect(validOutage(input)).toBe(true);
    });

    it('should accept outage beginning just after threshold date', function () {
        const input = {
            "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
            "begin": "2022-01-01T00:00:00.001Z",
            "end": "2022-11-13T02:16:38.905Z"
        };
        expect(validOutage(input)).toBe(true);
    });

    it('should accept outage beginning after threshold date', function () {
        const input = {
            "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
            "begin": "2023-01-01T00:00:00.000Z",
            "end": "2023-11-13T02:16:38.905Z"
        };
        expect(validOutage(input)).toBe(true);
    });
});