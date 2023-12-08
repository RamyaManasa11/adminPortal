import { Box, Stepper, Step, StepLabel, Button, Typography, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import loyaltyCampaignApi from '../../API/campaign/loyalty.campaign.api';
import { useNavigate } from "react-router";
import { useForm, FormProvider } from 'react-hook-form';
import CampaignPointStructure from './CampaignPointStructure';
import { CampaignInstance } from './CampaignInstance';
import TitleDescription from '../CommonComponents/TitleDescription';
import DateTime from '../CommonComponents/DateTime';
import CampaignRewardTypes from '../CommonComponents/CampaignRewardTypes';
import Swal, {SweetAlertOptions} from 'sweetalert2';

function getSteps() {
    return [
        "Choose Campaign Type",
        "Title & Description",
        "Point Structure",
        "Date & Time"
    ];
}

const CampaignFields = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedCampaignType, setSelectedCampaignType] = useState("");
    const [types, setTypes] = useState([]);
    const steps = getSteps();
    const [campaignStatus, setCampaignStatus] = useState(false);
    const [campaignInstance, setCampaignInstance] = useState<any>({});

    const getCampaignTypes = async () => {
        const listRes: any = await loyaltyCampaignApi.getCampainTypes();
        setTypes(listRes?.campaignTypes);
        setSelectedCampaignType(listRes?.campaignTypes[0]);
    }

    useEffect(() => {
        if (Object.keys(campaignInstance).length === 0) {
            const newCampaign = CampaignInstance();
            setCampaignInstance(newCampaign);
        }
        getCampaignTypes();
    }, []);

    const handleCampaignType = (type: React.SetStateAction<string>) => {
        setSelectedCampaignType(type);
    };

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <CampaignRewardTypes createType={"campaign"} types={types} selectedType={selectedCampaignType} handleType={handleCampaignType} />;
            case 1:
                return <TitleDescription createType={"campaign"}/>;
            case 2:
                return <CampaignPointStructure selectedCampaignType={selectedCampaignType} />;
            case 3:
                return <DateTime createType={"campaign"}/>;
            default:
                return ""
        }
    }

    const methods = useForm({
        defaultValues: campaignInstance
    });

    const createCampaign = async (campDetails: any) => {
        let campaignRequest = {
            ...campDetails,
            startTime: campDetails.startTime / 1000,
            endTime: campDetails.endTime / 1000,
            maxPoints: parseInt(campDetails.maxPoints),
            earnPoints: parseInt(campDetails.earnPoints),
            amountSpent: parseInt(campDetails.amountSpent)
        }
        return loyaltyCampaignApi.createCampaign({
            payload: campaignRequest,
        });
    }

    const handleNext = async (data: any) => {
        if (activeStep === steps.length - 1) {
            try {
                let campDetails = {
                    ...data,
                }
                const detailsRes: any = await createCampaign(campDetails);
                if (detailsRes?.message === 'Campaign created') {
                    setCampaignStatus(true);
                }
                else{
                    setCampaignStatus(false);
                    onError(detailsRes?.message)
                }
            } catch (err: any) {
                console.log(err)
            }
        };
        setActiveStep(activeStep + 1);
    }

    const onSuccess = () =>{
        Swal.fire({
            title: "Success",
            text: "You have successfully created a new campaign",
            icon: 'success',
            confirmButtonColor: 'green'
        }as SweetAlertOptions).then(function () {
            navigate('/campaign');
        })
    }
    const onError = (error: any) =>{
        console.log(error);
        Swal.fire({
            title: "Error",
            text: error,
            icon: 'error',
            confirmButtonColor: '#d33'
        }as SweetAlertOptions).then(function(){
            navigate('/campaign')
        })
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
            {activeStep === steps.length && campaignStatus ? ( 
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
export default CampaignFields;
