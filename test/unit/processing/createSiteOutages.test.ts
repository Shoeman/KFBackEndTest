import {createSiteOutages} from "../../../src/processing/createSiteOutages";


describe('createSiteOutages', () => {

    it('should handle empty inputs', function () {

        const siteInfo = {
            id: "",
            name: "",
            devices: []
        }
        const result = createSiteOutages([], siteInfo);
        expect(result).toEqual([]);
    });

    it('should not return mismatching ids', function () {

        const outages = [{
            id: "foo",
            begin: "2022-05-23T12:21:27.377Z",
            end: "2022-11-13T02:16:38.905Z"
        }]

        const siteInfo = {
            id: "nomatch",
            name: "No Matching devices",
            devices: [{
                id: "bar",
                name: "Bar"
            }]
        }
        const result = createSiteOutages(outages, siteInfo);
        expect(result).toEqual([]);
    });

    it('should join matching valid outages and devices by id', function () {

        const outages = [{
            id: "foo",
            begin: "2022-05-23T12:21:27.377Z",
            end: "2022-11-13T02:16:38.905Z"
        }]

        const siteInfo = {
            id: "matching",
            name: "Has matching devices",
            devices: [{
                id: "foo",
                name: "Foo"
            }]
        }
        const result = createSiteOutages(outages, siteInfo);
        expect(result).toEqual([{
            id: "foo",
            name: "Foo",
            begin: "2022-05-23T12:21:27.377Z",
            end: "2022-11-13T02:16:38.905Z"
        }]);
    });

    it('should add multiple outages if they match the same device', function () {

        const outages = [
            {
                id: "foo",
                begin: "2022-05-23T12:21:27.377Z",
                end: "2022-11-13T02:16:38.905Z"
            },
            {
                id: "foo",
                begin: "2022-06-23T12:21:27.377Z",
                end: "2022-12-13T02:16:38.905Z"
            }
        ]

        const siteInfo = {
            id: "matching",
            name: "Has matching devices",
            devices: [{
                id: "foo",
                name: "Foo"
            }]
        }
        const result = createSiteOutages(outages, siteInfo);
        expect(result).toEqual([
            {
                id: "foo",
                name: "Foo",
                begin: "2022-05-23T12:21:27.377Z",
                end: "2022-11-13T02:16:38.905Z"
            },
            {
                id: "foo",
                name: "Foo",
                begin: "2022-06-23T12:21:27.377Z",
                end: "2022-12-13T02:16:38.905Z"
            }
        ]);
    });
})