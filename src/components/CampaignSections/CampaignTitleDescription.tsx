import { TextField, Box, Grid } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import TitleSubTitle from "../TitleSubtitle";

const CampaignTitleDescription = () => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <Box>
            <Grid container rowSpacing={1}>
                <Grid
                    item
                    xs={12}
                    sm={5}
                    md={5}
                    lg={5}
                    sx={{
                        paddingRight: {
                            xs: '10px',
                            sm: '10px',
                            md: '55px',
                        },
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <TitleSubTitle
                        title={`${('title')}*`}
                        subTitle={"This will be your campaign Title"}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={9}
                    md={7}
                    lg={7}
                >
                    <Controller
                        control={control}
                        name="title"
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField
                                id="title"
                                placeholder='Enter Title'
                                fullWidth
                                {...field}
                                error={errors.title ? true : false}
                                helperText={!errors.title ? "" : "Title is required"}
                            />
                        )}
                    />

                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={5}
                    md={5}
                    lg={5}
                    sx={{
                        paddingRight: {
                            xs: '10px',
                            sm: '10px',
                            md: '55px',
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: { sm: '30px', xs: '30px' },
                    }}
                >
                    <TitleSubTitle
                        title={`${('Description')}*`}
                        subTitle={'Provide a brief overview of your campaign'}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={9}
                    md={7}
                    lg={7}
                >
                    <Controller
                        control={control}
                        name="description"
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField
                                id="description"
                                placeholder='Enter description'
                                fullWidth
                                margin="normal"
                                {...field}
                                error={errors.description ? true : false}
                                helperText={errors.description ? "Description is required" : ""}
                            />
                        )}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={5}
                    md={5}
                    lg={5}
                    sx={{
                        paddingRight: {
                            xs: '10px',
                            sm: '10px',
                            md: '55px',
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: { sm: '30px', xs: '30px' },
                    }}
                >
                    <TitleSubTitle
                        title={`${('short Description')}*`}
                        subTitle={('Provide a short overview of your campaign')}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={9}
                    md={7}
                    lg={7}
                >
                    <Controller
                        control={control}
                        name="shortDescription"
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField
                                id="shortDescription"
                                variant="outlined"
                                placeholder='Enter shortDescription'
                                fullWidth
                                margin="normal"
                                {...field}
                                error={errors.shortDescription ? true : false}
                                helperText={errors.shortDescription ? "Short Description is Required" : ""}
                            />
                        )}
                    />

                </Grid>
            </Grid>
        </Box>
    )
}

export default CampaignTitleDescription;