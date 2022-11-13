import {httpGet} from "../../../src/requests/httpRequests";
import {getSiteInfoById} from "../../../src/requests/siteInfo";

jest.mock('../../../src/requests/httpRequests');

const mockHttpGet = httpGet as jest.Mock;

process.env.KF_API_URL="test.com"

describe('getSiteInfoById', () => {

    it('should request the site-info endpoint and return the response data', async function () {
        const mockReturnValue = {
            data: {
                id: 'bristol-berry-shrub',
                name: 'Bristol Berry Shrub',
                devices: [
                    { id: '002b28fc-283c-47ec-9af2-ea287336dc1b', name: 'Battery 1' }
                ]
            },
            status: 200
        };
        mockHttpGet.mockResolvedValueOnce(mockReturnValue);

        const result = getSiteInfoById("bristol-berry-shrub");
        expect(mockHttpGet).toBeCalledWith("test.com/site-info/bristol-berry-shrub");
        await expect(result).resolves.toEqual({
            id: 'bristol-berry-shrub',
            name: 'Bristol Berry Shrub',
            devices: [
                { id: '002b28fc-283c-47ec-9af2-ea287336dc1b', name: 'Battery 1' }
            ]
        });
    });
});