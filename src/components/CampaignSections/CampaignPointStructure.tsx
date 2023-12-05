import { Grid, TextField } from "@mui/material"
import TitleSubTitle from "../TitleSubtitle"
import { Controller, useFormContext } from "react-hook-form"

interface props {
  selectedCampaignType: string
}

const CampaignPointStructure = ({ selectedCampaignType }: props) => {
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
            title={`${('earn points')}*`}
            subTitle={"Enter the number of points"}
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
            name="earnPoints"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                id="earnPoints"
                placeholder='Enter earnPoints'
                fullWidth
                {...field}
                error={errors.earnPoints ? true : false}
                helperText={!errors.earnPoints ? "" : "EarnPoints is required"}
              />

            )}
          />
        </Grid>
        {(selectedCampaignType === "Point for purchase") ?
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
                title={`${('amount Spent')}*`}
                subTitle={'Enter the amount(for Ex: $20)'}
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
                name="amountSpent"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="amountSpent,"
                    placeholder='Enter amount spent,'
                    fullWidth
                    margin="normal"
                    {...field}
                    error={errors.spendPoints ? true : false}
                    helperText={!errors.spendPoints ? "" : "AmountSpent is required"}
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
                title={`${('Maximum Point A Customer Can Earn For Each Order')}*`}
                subTitle={('Enter the number that a customer can earn from a single order')}
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
                name="maxPoints"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="maxPoints"
                    placeholder='Enter maxPoints'
                    fullWidth
                    margin="normal"
                    {...field}
                    error={errors.maxPoints ? true : false}
                    helperText={!errors.maxPoints ? "" : "MaxPoints is required"}
                  />
                )}
              />
            </Grid>
          </Grid> :
          <Grid></Grid>}
      </Grid>
    </>
  )
}

export default CampaignPointStructure
