import { Box, Grid } from "@mui/material";
import TitleSubTitle from "../TitleSubtitle";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";


const CampaignDateTime = () => {

  const { control } = useFormContext();

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
            title={`${('Start Date & Time')}`}
            subTitle={`${('Please choose the start date and time of the Campaign')}`}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          md={7}
          lg={7}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <Controller
                control={control}
                name="startTime"
                render={({ field }) => {
                  return (
                    <DateTimePicker
                      value={(field.value ? dayjs(field.value) : null)}
                      onChange={(date) => {
                        field.onChange(date ? date.valueOf() : null);
                      }}
                    />
                  );
                }} />
            </DemoContainer>
          </LocalizationProvider>
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
            marginTop: { sm: '40px', xs: '30px' },
          }}
        >
          <TitleSubTitle
            title={`${('End Date & Time')}`}
            subTitle={`${('Please choose the end date and time of the Campaign')}`}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          md={7}
          lg={7}
          sx={{ marginTop: { sm: '40px', xs: '14px' } }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <Controller
                control={control}
                name="endTime"
                render={({ field }) => {
                  return (
                    <DateTimePicker
                      value={(field.value ? dayjs(field.value) : null)}
                      onChange={(date) => {
                        field.onChange(date ? date.valueOf() : null);
                      }}
                    />
                  );
                }} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  )
}
export default CampaignDateTime;
