import { Paper } from "@material-ui/core"
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material"
import CampaignFields from "../components/CampaignSections/CampaignFields"
import RewardFields from "../components/RewardSections/RewardFields"

const CreateCampaignReward = () => {
  const paperStyle = {
    borderRadius: '20px',
    padding: '20px 15px',
    height: 'auto',
    width: 'auto',
    margin: '10px',
  }
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar sx={{ backgroundColor: "black" }}>
          <Typography variant="h6" component="div">
            {(window.location.pathname==='/create-reward'?"New Reward":"New Campaign")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component={Box} p={12}>
        <Paper component={Box} style={paperStyle}>
        {(window.location.pathname==='/create-reward'?<RewardFields />:<CampaignFields />)}
        </Paper>
      </Container>
    </>
  )
}

export default CreateCampaignReward;
