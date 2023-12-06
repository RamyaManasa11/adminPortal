import { Grid, TextField } from "@mui/material"
import TitleSubTitle from "../TitleSubtitle"
import { Controller, useFormContext } from "react-hook-form"

interface props {
  selectedRewardType: string
}

const RewardPointStructure = ({ selectedRewardType }: props) => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
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
            title={(selectedRewardType==="Token Conversion")?`${('token value')}*`:`${('discount value')}*`}
            subTitle={(selectedRewardType==="Token Conversion")?"Enter the token value":"This will be the your discount value"}
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
            name="discount"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                id="discount"
                placeholder={(selectedRewardType==="Token Conversion")?'Please add token value here':"Please add discount value here"}
                fullWidth
                {...field}
                error={errors.discount ? true : false}
                helperText={!errors.discount ? "" : "value is required"}
              />

            )}
          />
        </Grid>
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
                flexDirection: 'column',
                marginTop: { sm: '30px', xs: '30px' },
              }}
            >
              <TitleSubTitle
                title={`${('Spend Points')}*`}
                subTitle={'Enter the number of points'}
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
                name="pointSpent"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="pointSpent,"
                    placeholder='Please add points here,'
                    fullWidth
                    margin="normal"
                    {...field}
                    error={errors.pointSpent ? true : false}
                    helperText={!errors.pointSpent ? "" : "AmountSpent is required"}
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
                title={`${('Redeem Counts')}*`}
                subTitle={('Choose the number of redeem')}
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
                name="maxRedeemPoints"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="maxRedeemPoints"
                    placeholder='Unlimited is optional'
                    fullWidth
                    margin="normal"
                    {...field}
                    error={errors.maxRedeemPoints ? true : false}
                    helperText={!errors.maxRedeemPoints ? "" : "Redeem counts is required"}
                  />
                )}
              />
            </Grid>
          </Grid>
      </Grid>
    </>
  )
}

export default RewardPointStructure
