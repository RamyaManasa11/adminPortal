import { Stack, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import loyaltyCampaignApi from "../../API/campaign/loyalty.campaign.api";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

interface props {
    address: string;
    handleUpdate: any;
}

const UpdateCampaign = ({ address, handleUpdate}: props) => {
    const [campaignInstance, setCampaignInstance] = useState<any>({});
    const [edit, isEdit] = useState(false);

    const toUnixTimestamp = (event: { toISOString: () => any; }) => {
        let newDateTime = event?.toISOString();
        let formattedTime = new Date(newDateTime).valueOf()
        return formattedTime;
    };


    const handleClick = (event: any) => {
        setCampaignInstance({
            ...campaignInstance,
            [event.target.name]: event.target.value
        })
        isEdit(true);
        console.log(event.target.value)
    }
    const handleEndTimeChange = (event: any) => {
        setCampaignInstance({
            ...campaignInstance,
           endTime: toUnixTimestamp(event),
        })
        isEdit(true);
        console.log(campaignInstance.endTime)
    }
    const handleStartTimeChange = (event: any) => {
        setCampaignInstance({
            ...campaignInstance,
            startTime: toUnixTimestamp(event),
        })
        isEdit(true);
        console.log(campaignInstance.startTime)
    }

    const getCampaignDetails = async (campaignAddress: any) => {
        const listRes = await loyaltyCampaignApi.getCampainDetails(campaignAddress);
        setCampaignInstance({
            title: listRes.result.title,
            shortDescription: listRes.result.shortDescription,
            description: listRes.result.description,
            amountSpent: listRes.result.amountSpent,
            earnPoints: listRes.result.earnPoints,
            maxPoints: listRes.result.maxPoints,
            startTime: new Date(listRes.result.startTime * 1000),
            endTime: new Date(listRes.result.endTime * 1000),
        });
        console.log(listRes.result);
    };
    // console.log(campaignInstance)

    useEffect(() => {
        getCampaignDetails(address);
        
    }, [])

    const updateCampaign = async () => {
        let campaignRequest = {
            ...campaignInstance,
            earnPoints: parseInt(campaignInstance.earnPoints),
            amountSpent: parseInt(campaignInstance.amountSpent),
            maxPoints: parseInt(campaignInstance.maxPoints),
            startTime: campaignInstance.startTime / 1000,
            endTime: campaignInstance.endTime / 1000,
            campaignAddress: address
        };
        return loyaltyCampaignApi.updateCampaign({
            payload: campaignRequest,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if(edit==true){
                const detailsRes: any = await updateCampaign();
            if (
                detailsRes?.message ===
                'Campaign updated'
            ) {
                toast.success(detailsRes.message);
                handleUpdate();
            } else {
                toast.warning(detailsRes.message);
            }
            }
            else{
                console.log("no changes made")
                toast.warning("no changes to update")
                
            }
            
        } catch (err: any) {
            console.log('err', err);
        }
        console.log(campaignInstance)
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
                <Stack spacing={4} margin={2}>
                    <TextField
                        required
                        id="outlined-required"
                        name="title"
                        label="Title"
                        defaultValue="Title"
                        value={campaignInstance.title}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        name="description"
                        defaultValue="Description"
                        value={campaignInstance.description}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        name="shortDescription"
                        label="ShortDescription"
                        defaultValue=" ShortDescription"
                        value={campaignInstance.shortDescription}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        name="earnPoints"
                        label="EarnPoints"
                        defaultValue="EarnPoints"
                        value={campaignInstance.earnPoints}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        name="amountSpent"
                        label="AmountSpent"
                        defaultValue="AmountSpent"
                        value={campaignInstance.amountSpent}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        name="maxPoints"
                        label="MaxPoints"
                        defaultValue="MaxPoints"
                        value={campaignInstance.maxPoints}
                        onChange={handleClick}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                            label="StartTime"
                                value={dayjs(campaignInstance.startTime)}
                                onChange={handleStartTimeChange}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                            label="EndTime"
                                value={dayjs(campaignInstance.endTime)}
                                onChange={handleEndTimeChange}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Button autoFocus type="submit">Update</Button>
                </Stack>
            </form>
    </>
  )
}

export default UpdateCampaign
