import { MenuItem, Select, Stack, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import loyaltyRewardApi from "../../API/reward/loyalty.reward.api";

interface props {
    address: string;
    handleUpdate: any;
}

const UpdateReward = ({ address, handleUpdate }: props) => {
    const [rewardInstance, setRewardInstance] = useState<any>({});
    const [edit, isEdit] = useState(false);

    const toUnixTimestamp = (event: { toISOString: () => any; }) => {
        let newDateTime = event?.toISOString();
        let formattedTime = new Date(newDateTime).valueOf()
        return formattedTime;
    };


    const handleRewardType = (event: any) => {
        setRewardInstance({
            ...rewardInstance,
            rewardType: (event.target.value==0?"Token Conversion" : "Voucher Conversion")
        })
        console.log(event.target.value)
        isEdit(true);
    }
    const handleClick = (event: any) => {
        setRewardInstance({
            ...rewardInstance,
            [event.target.name]: event.target.value
        })
        isEdit(true);
        console.log(event.target.value)
    }
    const handleEndTimeChange = (event: any) => {
        setRewardInstance({
            ...rewardInstance,
            endTime: toUnixTimestamp(event),
        })
        isEdit(true);
    }
    const handleStartTimeChange = (event: any) => {
        setRewardInstance({
            ...rewardInstance,
            startTime: toUnixTimestamp(event),
        })
        isEdit(true);
    }

    const getRewardDetails = async (rewardAddress: any) => {
        const listRes = await loyaltyRewardApi.getRewardDetails(rewardAddress);
        setRewardInstance({
            rewardType: listRes.result.rewardType,
            title: listRes.result.title,
            shortDescription: listRes.result.shortDescription,
            description: listRes.result.description,
            pointSpent: listRes.result.pointSpent,
            discount: listRes.result.discount,
            maxRedeemPoints: listRes.result.maxRedeemPoints,
            startTime: new Date(listRes.result.startTime * 1000),
            endTime: new Date(listRes.result.endTime * 1000),
        });
        console.log(listRes.result);
    };

    useEffect(() => {
        getRewardDetails(address);

    }, [])

    const updateReward = async () => {
        let rewardRequest = {
            ...rewardInstance,
            rewardType: ((rewardInstance.rewardType)=="Token Conversion" ? 0 : 1),
            discount: parseInt(rewardInstance.discount),
            pointSpent: parseInt(rewardInstance.pointSpent),
            maxRedeemPoints: parseInt(rewardInstance.maxRedeemPoints),
            startTime: rewardInstance.startTime / 1000,
            endTime: rewardInstance.endTime / 1000,
            rewardAddress: address
        };
        return loyaltyRewardApi.updateReward({
            payload: rewardRequest,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (edit == true) {
                const detailsRes: any = await updateReward();
                if (
                    detailsRes?.message ===
                    'Reward updated'
                ) {
                    toast.success(detailsRes.message);
                    handleUpdate();
                } else {
                    toast.warning(detailsRes.message);
                }
            }
            else {
                console.log("no changes made")
                toast.warning("no changes to update")

            }

        } catch (err: any) {
            console.log('err', err);
        }
        console.log(rewardInstance)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4} margin={2}>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={(rewardInstance.rewardType==0)?"Token Conversion": "Voucher Conversion"}
                        label="rewardType"
                        name="rewardType"
                        onChange={handleRewardType} 
                    >
                        <MenuItem value={"Token Conversion"}>Token Conversion</MenuItem>
                        <MenuItem value={"Voucher Conversion"}>Voucher Conversion</MenuItem>
                    </Select>
                    <TextField
                        required
                        id="outlined-required"
                        name="title"
                        label="Title"
                        defaultValue="Title"
                        value={rewardInstance.title}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        name="description"
                        defaultValue="Description"
                        value={rewardInstance.description}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        name="shortDescription"
                        label="ShortDescription"
                        defaultValue=" ShortDescription"
                        value={rewardInstance.shortDescription}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        name="discount"
                        label="Discount Value"
                        defaultValue="EarnPoints"
                        value={rewardInstance.discount}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        name="pointSpent"
                        label="pointSpent"
                        defaultValue="pointSpent"
                        value={rewardInstance.pointSpent}
                        onChange={handleClick}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        name="maxRedeemPoints"
                        label="maxRedeemPoints"
                        defaultValue="maxRedeemPoints"
                        value={rewardInstance.maxRedeemPoints}
                        onChange={handleClick}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="StartTime"
                                value={dayjs(rewardInstance.startTime)}
                                onChange={handleStartTimeChange}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="EndTime"
                                value={dayjs(rewardInstance.endTime)}
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

export default UpdateReward
