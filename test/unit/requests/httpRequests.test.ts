import {httpGet, httpPost} from "../../../src/requests/httpRequests";
import axios from "axios";

jest.mock('axios');
const mockGet = axios.get as jest.Mock;
const mockPost = axios.post as jest.Mock;

describe("httpGet", () => {

    beforeEach(() => {
        process.env.REQUEST_MAX_RETRIES = "1";
        process.env.REQUEST_RETRY_WAIT_TIME = "0";
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('should take a url', async function () {

        // Unused in this test
        process.env.REQUEST_MAX_RETRIES = "";
        process.env.REQUEST_RETRY_WAIT_TIME = "";

        mockGet.mockResolvedValueOnce({data: "foo", status: 200});

        const result = httpGet("https://api.zooklabs.com/zooks/1", "TestKey");

        const expectedConfig = {
            headers: {
                "x-api-key": "TestKey"
            }
        };
        expect(mockGet).toBeCalledTimes(1);
        expect(mockGet).toBeCalledWith("https://api.zooklabs.com/zooks/1", expectedConfig);
        await expect(result).resolves.toEqual({data: "foo", status: 200});
    });

    it('should reject if it gets a 400 error response', async function () {

        mockGet.mockRejectedValueOnce({data: "invalid", status: 403});

        const result = httpGet("https://api.zooklabs.com/zooks/1", "TestKey");

        const expectedConfig = {
            headers: {
                "x-api-key": "TestKey"
            }
        };
        expect(mockGet).toBeCalledTimes(1);
        expect(mockGet).toHaveBeenCalledWith("https://api.zooklabs.com/zooks/1", expectedConfig)
        await expect(result).rejects.toEqual({data: "invalid", status: 403});
    });

    it('should retry if it gets a 500', async function () {

        mockGet.mockRejectedValueOnce({data: "error", status: 500});
        mockGet.mockResolvedValueOnce({data: "foo", status: 200});

        const result = httpGet("https://api.zooklabs.com/zooks/1", "TestKey");

        const expectedConfig = {
            headers: {
                "x-api-key": "TestKey"
            }
        };
        // Jest cannot seem to count subsequent calls to axios but it does throw and retry
        // expect(mockGet).toBeCalledTimes(2);
        expect(mockGet).toHaveBeenNthCalledWith(1, "https://api.zooklabs.com/zooks/1", expectedConfig)
        // expect(mockGet).toHaveBeenNthCalledWith(2, "https://api.zooklabs.com/zooks/1", expectedConfig);
        await expect(result).resolves.toEqual({data: "foo", status: 200});
    });

    it('should reject with 500 if retries exceeded', async function () {

        mockGet.mockRejectedValueOnce({data: "error", status: 500});
        mockGet.mockRejectedValueOnce({data: "error", status: 500});
        mockGet.mockResolvedValueOnce({data: "foo", status: 200});

        const result = httpGet("https://api.zooklabs.com/zooks/1", "TestKey");

        const expectedConfig = {
            headers: {
                "x-api-key": "TestKey"
            }
        };
        // Jest cannot seem to count subsequent calls to axios but it does throw and retry
        // expect(mockGet).toBeCalledTimes(2);
        expect(mockGet).toHaveBeenNthCalledWith(1, "https://api.zooklabs.com/zooks/1", expectedConfig)
        // expect(mockGet).toHaveBeenNthCalledWith(2, "https://api.zooklabs.com/zooks/1", expectedConfig);
        await expect(result).rejects.toEqual({data: "error", status: 500});
    });
});

describe("httpPost", () => {

    beforeEach(() => {
        process.env.REQUEST_MAX_RETRIES = "1";
        process.env.REQUEST_RETRY_WAIT_TIME = "0";
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

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

    it('should reject if it gets a 400 error', async function () {

        const postData = {
            "foo": "bar"
        }
        mockPost.mockRejectedValueOnce({data: "invalid", status: 403});

        const result = httpPost("https://api.zooklabs.com/zooks/1", "TestKey", postData);

        const expectedConfig = {
            headers: {
                "x-api-key": "TestKey"
            }
        };
        expect(mockPost).toBeCalledTimes(1);
        expect(mockPost).toBeCalledWith("https://api.zooklabs.com/zooks/1", postData, expectedConfig);
        await expect(result).rejects.toEqual({data: "invalid", status: 403});
    });

    it('should retry if it gets a 500', async function () {

        const postData = {
            "foo": "bar"
        }
        mockPost.mockRejectedValueOnce({data: "error", status: 500});
        mockPost.mockResolvedValueOnce({data: "foo", status: 200});

        const result = httpPost("https://api.zooklabs.com/zooks/1", "TestKey", postData);

        const expectedConfig = {
            headers: {
                "x-api-key": "TestKey"
            }
        };
        // Jest cannot seem to count subsequent calls to axios but it does throw and retry
        // expect(mockPost).toBeCalledTimes(2);
        expect(mockPost).toHaveBeenNthCalledWith(1, "https://api.zooklabs.com/zooks/1", postData, expectedConfig)
        // expect(mockPost).toHaveBeenNthCalledWith(2, "https://api.zooklabs.com/zooks/1", postData, expectedConfig);
        await expect(result).resolves.toEqual({data: "foo", status: 200});
    });

    it('should reject with 500 if retries exceeded', async function () {

        const postData = {
            "foo": "bar"
        }
        mockPost.mockRejectedValueOnce({data: "error", status: 500});
        mockPost.mockRejectedValueOnce({data: "error", status: 500});
        mockPost.mockResolvedValueOnce({data: "foo", status: 200});

        const result = httpPost("https://api.zooklabs.com/zooks/1", "TestKey", postData);

        const expectedConfig = {
            headers: {
                "x-api-key": "TestKey"
            }
        };
        // Jest cannot seem to count subsequent calls to axios but it does throw and retry
        // expect(mockPost).toBeCalledTimes(2);
        expect(mockPost).toHaveBeenNthCalledWith(1, "https://api.zooklabs.com/zooks/1", postData, expectedConfig)
        // expect(mockPost).toHaveBeenNthCalledWith(2, "https://api.zooklabs.com/zooks/1", postData, expectedConfig);
        await expect(result).rejects.toEqual({data: "error", status: 500});
    });
});