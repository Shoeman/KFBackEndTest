import {httpGet} from "../../../src/requests/httpRequests";
import axios from "axios";

jest.mock('axios')
const mockGet = axios.get as jest.Mock;


describe("httpGet", () => {

    it('should take a url', async function () {

        mockGet.mockResolvedValueOnce({data: "foo", status: 200});

        const result = httpGet("https://api.zooklabs.com/zooks/1");

        expect(mockGet).toBeCalledTimes(1);
        expect(mockGet).toBeCalledWith("https://api.zooklabs.com/zooks/1");
        await expect(result).resolves.toEqual({data: "foo", status: 200})
    });
});