import {dummyFunction} from "../../src";


describe("dummyFunction", () => {

    it('should add numbers', function () {
        expect(dummyFunction(1, 2)).toEqual(3);
    });
});