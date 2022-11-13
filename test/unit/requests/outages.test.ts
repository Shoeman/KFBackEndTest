import {httpGet} from "../../../src/requests/httpRequests";
import {getOutages} from "../../../src/requests/outages";

jest.mock('../../../src/requests/httpRequests');

const mockHttpGet = httpGet as jest.Mock;

process.env.KF_API_URL="test.com"
process.env.KF_API_KEY="testkey"

describe('getOutages', () => {

    it('should request the outages endpoint and return the response data', async function () {

        const mockReturnValue = {
            data: [{
                id: "foo",
                begin: "2021-07-26T17:09:31.036Z",
                end: "2021-08-29T00:37:42.253Z"
            }],
            status: 200
        };
        mockHttpGet.mockResolvedValueOnce(mockReturnValue);

        const result = getOutages();

        expect(mockHttpGet).toBeCalledWith("test.com/outages", "testkey");
        await expect(result).resolves.toEqual([{
            id: "foo",
            begin: "2021-07-26T17:09:31.036Z",
            end: "2021-08-29T00:37:42.253Z"
        }]);
    });
});