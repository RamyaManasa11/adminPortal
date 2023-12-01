import axios from 'axios';

const loyaltyRewardApi = {
    getRewardList: async () => {
        try {
            const res = await axios.get('https://loyalty.portal.hcl-x.com/v1/reward/getRewardList', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache',
                },
                withCredentials: true,
            });
            return res.data;
        } catch (err: any) {
            return err;
        }
    }
}
export default loyaltyRewardApi;