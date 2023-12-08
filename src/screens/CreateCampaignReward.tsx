import { Paper } from "@material-ui/core"
import { AppBar, Box, Container, CssBaseline, Dialog, Grid, Toolbar, Typography } from "@mui/material"
import CampaignFields from "../components/CampaignSections/CampaignFields"
import RewardFields from "../components/RewardSections/RewardFields"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import AlertPopup from "../components/CommonComponents/AlertPopup";

const CreateCampaignReward = () => {
  const paperStyle = {
    borderRadius: '20px',
    padding: '20px 15px',
    height: 'auto',
    width: 'auto',
    margin: '10px',
  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar sx={{ backgroundColor: "black" }}>
          <Grid component={Box}>
            <ArrowBackIcon sx={{ marginRight: '10px', marginLeft: '-15px' }} onClick={() => handleClickOpen()} />
          </Grid>
          <Typography variant="h6" component="div">
            {(window.location.pathname === '/create-reward' ? "New Reward" : "New Campaign")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component={Box} p={12}>
        <Paper component={Box} style={paperStyle}>
          {(window.location.pathname === '/create-reward' ? <RewardFields /> : <CampaignFields />)}
        </Paper>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <AlertPopup open={open} handleClick={handleClose} />
        </Dialog>
      </Container>
    </>
  )
}

export default CreateCampaignReward;
