import {httpGet, httpPost} from "../../../src/requests/httpRequests";
import axios from "axios";

jest.mock('axios');
const mockGet = axios.get as jest.Mock;
const mockPost = axios.post as jest.Mock;

process.env.KF_API_KEY="TestKey"

describe("httpGet", () => {

    it('should take a url', async function () {

        mockGet.mockResolvedValueOnce({data: "foo", status: 200});

        const result = httpGet("https://api.zooklabs.com/zooks/1");

        const expectedConfig = {
            headers: {
                "x-api-key": "TestKey"
            }
        };
        expect(mockGet).toBeCalledTimes(1);
        expect(mockGet).toBeCalledWith("https://api.zooklabs.com/zooks/1", expectedConfig);
        await expect(result).resolves.toEqual({data: "foo", status: 200});
    });
});

describe("httpPost", () => {

    it('should take a url, key and data', async function () {

        const postData = {
            "foo": "bar"
        }
        mockPost.mockResolvedValueOnce({data: "foo", status: 200});

        const result = httpPost("https://api.zooklabs.com/zooks/1", "TestKey", postData);

        const expectedConfig = {
            headers: {
                "x-api-key": "TestKey"
            }
        };
        expect(mockPost).toBeCalledTimes(1);
        expect(mockPost).toBeCalledWith("https://api.zooklabs.com/zooks/1", postData, expectedConfig);
        await expect(result).resolves.toEqual({data: "foo", status: 200});
    });
});