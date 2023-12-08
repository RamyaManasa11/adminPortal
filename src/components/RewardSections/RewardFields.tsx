import { Box, Stepper, Step, StepLabel, Button, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useForm, FormProvider } from 'react-hook-form';
import loyaltyRewardApi from '../../API/reward/loyalty.reward.api';
import { RewardInstance } from './RewardInstance';
import RewardPointStructure from './RewardPointStructure';
import TitleDescription from '../CommonComponents/TitleDescription';
import DateTime from '../CommonComponents/DateTime';
import CampaignRewardTypes from '../CommonComponents/CampaignRewardTypes';
import Swal, { SweetAlertOptions } from 'sweetalert2';

function getSteps() {
    return [
        "Choose Reward Type",
        "Title & Description",
        "Point Structure",
        "Date & Time"
    ];
}

const RewardFields = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedRewardType, setSelectedRewardType] = useState("");
    const [types, setTypes] = useState([]);
    const steps = getSteps();
    const [rewardStatus, setRewardStatus] = useState(false);
    const [rewardInstance, setRewardInstance] = useState<any>({});

    const getRewardTypes = async () => {
        const listRes: any = await loyaltyRewardApi.getRewardTypes();
        setTypes(listRes?.rewardTypes);
        setSelectedRewardType(listRes?.rewardTypes[0]);
    }

    useEffect(() => {
        if (Object.keys(rewardInstance).length === 0) {
            const newReward = RewardInstance();
            setRewardInstance(newReward);
        }
        getRewardTypes();
    }, []);

    const handleRewardType = (type: React.SetStateAction<string>) => {
        setSelectedRewardType(type);
    };

    const goToRewardList = () => {
        navigate('/reward');
    };

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <CampaignRewardTypes createType={"reward"} types={types} selectedType={selectedRewardType} handleType={handleRewardType} />;
            case 1:
                return <TitleDescription createType={"reward"} />;
            case 2:
                return <RewardPointStructure selectedRewardType={selectedRewardType} />;
            case 3:
                return <DateTime createType={"reward"} />;
            default:
                return ""
        }
    }

    const methods = useForm({
        defaultValues: rewardInstance
    });

    const createReward = async (rewardDetails: any) => {
        let rewardRequest = {
            ...rewardDetails,
            startTime: rewardDetails.startTime / 1000,
            endTime: rewardDetails.endTime / 1000,
            maxRedeemPoints: parseInt(rewardDetails.maxRedeemPoints),
            discount: parseInt(rewardDetails.discount),
            pointSpent: parseInt(rewardDetails.pointSpent)
        }
        return loyaltyRewardApi.createReward({
            payload: rewardRequest,
        });
    }

    const onSuccess = () => {
        Swal.fire({
            title: "Success",
            text: "You have successfully created a new Reward",
            icon: 'success',
            confirmButtonColor: 'green'
        } as SweetAlertOptions).then(function () {
            navigate('/reward');
        })
    }
    const onError = (error: any) => {
        console.log(error);
        Swal.fire({
            title: "Error",
            text: error,
            icon: 'error',
            confirmButtonColor: '#d33'
        } as SweetAlertOptions).then(function () {
            navigate('/reward')
        })
    }

    const handleNext = async (data: any) => {
        if (activeStep === steps.length - 1) {
            try {
                let rewardDetails = {
                    ...data,
                    rewardType: (selectedRewardType === "Token Conversion" ? false : true)
                }
                const detailsRes: any = await createReward(rewardDetails);;
                if (detailsRes?.message === 'Reward created') {
                    setRewardStatus(true);
                }
                else {
                    setRewardStatus(false);
                    onError(detailsRes?.message);
                }
            } catch (err: any) {
                console.log(err);
            }
        };
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ maxWidth: 1000, maxHeight: 1000 }}>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((step, index) => {
                    const labelProps = {};
                    const stepProps = {};
                    return (
                        <Step {...stepProps} key={index} sx={{ marginTop: 5, marginBottom: 10 }}>
                            <StepLabel {...labelProps}> {step} </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length && rewardStatus ? (
                <Grid component={Box}>
                    <Typography variant="h3" align="center">
                        {onSuccess()}
                    </Typography>
                </Grid>
            ) : (
                <>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(handleNext)} className='createCampaignForm'>
                            {getStepContent(activeStep)}
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ marginTop: 5 }}
                            >
                                back
                            </Button>

                            <Button
                                type="submit"
                                sx={{ marginTop: 5 }}>
                                {activeStep === steps.length - 1 ? "Publish" : "Next"}
                            </Button>
                        </form>
                    </FormProvider>
                </>
            )}
        </Box>
    );
};
export default RewardFields;
