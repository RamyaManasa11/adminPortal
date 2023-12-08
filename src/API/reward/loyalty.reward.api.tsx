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
    },
    getRewardTypes: async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_LOYALTY_API+'v1/reward/rewardType', {
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
    },
    createReward: async (payload: any) => {
        console.log(payload, "ActivePayload")
        try {
            const res = await axios.post(process.env.REACT_APP_LOYALTY_API+'v1/reward/createReward',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Cache-Control': 'no-cache',
                    },
                    withCredentials: true,
                }
            );

            return res.data.result ? res.data.result : res.data;
        } catch (err: any) {
            return err;
        }
    },
    updateReward: async (payload: any) => {
        console.log(payload, "ActivePayload")
        try {
            const res = axios.put(process.env.REACT_APP_LOYALTY_API+'v1/reward/updateReward', payload)
                .then(response => {
                    console.log("Status: ", response.status);
                    console.log("Data: ", response.data);
                    return response.data;
                })
            return res;
        } catch (err: any) {
            return err;
        }
    },
    getRewardDetails : async(input: string)=>{
        try {
            const res = await axios.get(process.env.REACT_APP_LOYALTY_API+'v1/reward/rewardDetails?rewardAddress=' + input,
                {
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
    },
}
export default loyaltyRewardApi;