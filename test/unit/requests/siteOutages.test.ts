import {httpPost} from "../../../src/requests/httpRequests";
import {postDeviceOutagesForSite} from "../../../src/requests/siteOutages";

jest.mock('../../../src/requests/httpRequests');
const mockHttpPost = httpPost as jest.Mock;

process.env.KF_API_URL="test.com";
process.env.KF_API_KEY="testapikey";

describe('postDeviceOutagesForSite', () => {

    it('should post data to the site-outages endpoint and return the response data', async function () {

        const mockReturnValue = {
            data: {},
            status: 200
        };
        mockHttpPost.mockResolvedValueOnce(mockReturnValue);

        const deviceOutages = [{
            id: "foo",
            name: "Foo",
            begin: "2022-05-23T12:21:27.377Z",
            end: "2022-11-13T02:16:38.905Z"
        }]

        const result = postDeviceOutagesForSite(deviceOutages, "bristol-berry-shrub");
        expect(mockHttpPost).toBeCalledWith("test.com/site-outages/bristol-berry-shrub", "testapikey", deviceOutages);
        await expect(result).resolves.toEqual({
            data: {},
            status: 200
        });
    });
});