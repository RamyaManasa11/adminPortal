import axios from 'axios';

const loyaltyCampaignApi = {
    getCampainList: async () => {
        try {
            const res = await axios.get(process.env.LOYALTY_MANAGEMENT_STAGE_URL+'v1/campaign/getCampaignList', {
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
    getCampainTypes: async () => {
        try {
            const res = await axios.get(process.env.LOYALTY_MANAGEMENT_STAGE_URL+"v1/campaign/campaignType", {
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
    createCampaign: async (payload: any) => {
        console.log(payload, "ActivePayload")
        try {
            const res = await axios.post(process.env.LOYALTY_MANAGEMENT_STAGE_URL+'v1/campaign/createCampaign',
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
    getCampainDetails: async (input: string) => {
        try {
            const res = await axios.get(process.env.LOYALTY_MANAGEMENT_STAGE_URL+'v1/campaign/campaignDetails?campaignAddress=' + input,
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
export default loyaltyCampaignApi;