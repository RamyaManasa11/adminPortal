import { Box, Grid, Typography } from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';

interface CampaignTypeProps {
  types: string[];
  selectedCampaignType: string,
  handleCampaignType: any
}

const CampaignTypes = ({ types, selectedCampaignType, handleCampaignType }: CampaignTypeProps) => {
  return (
    <Box>
      <Grid container>
        {types.map((item, index) => {
          return (
            <Grid
              item
              sm={5}
              md={6}
              lg={4}
              key={index}
              sx={{ padding: '10px 10px 10px 10px', cursor: 'pointer', }}
              onClick={() => {
                handleCampaignType(item);

              }}>
              <Box className="campaignTypeContainer" sx={{
                minHeight: '20px',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                border: selectedCampaignType == item
                  ? '1px solid ' + "#4B9EF9"
                  : '1px solid ' + "#A0A3BD",
                borderRadius: '10px'
              }}>
                <Box sx={{ width: '10%', border: '1px solid black', display: 'flex', justifyContent: 'center', backgroundColor: "#4B9EF9" }}>
                  <Box className="campaignTypeIcon"
                    sx={{
                      background: selectedCampaignType == item
                        ? "#4B9EF9"
                        : "#A0A3BD"
                    }}>
                  </Box>
                  <CampaignIcon sx={{ width: '24px', height: 'auto' }} />
                </Box>
                <Box sx={{ marginLeft: '20px', width: 'auto' }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>{item}</Typography>
                  <Typography sx={{ color: '#6E7191', fontSize: '10px' }}>{item}</Typography>
                </Box>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
};
export default CampaignTypes;