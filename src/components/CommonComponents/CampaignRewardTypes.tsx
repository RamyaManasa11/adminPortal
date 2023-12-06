import { Box, Grid, Typography } from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface CampaignRewardTypeProps {
    createType: string,
    types: string[];
    selectedType: string,
    handleType: any,
}

const CampaignRewardTypes = ({ createType, types, selectedType, handleType }: CampaignRewardTypeProps) => {
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
                                handleType(item);

                            }}>
                            <Box sx={{
                                minHeight: '20px',
                                display: 'flex',
                                flexDirection: 'row',
                                padding: '10px',
                                border: selectedType == item
                                    ? '1px solid ' + "#4B9EF9"
                                    : '1px solid ' + "#A0A3BD",
                                borderRadius: '10px'
                            }}>
                                <Box sx={{ width: '10%', border: '1px solid black', display: 'flex', justifyContent: 'center', backgroundColor: "#4B9EF9" }}>
                                    <Box
                                        sx={{
                                            background: selectedType == item
                                                ? "#4B9EF9"
                                                : "#A0A3BD"
                                        }}>
                                    </Box>
                                    {createType == "reward"
                                        ?
                                        <EmojiEventsIcon sx={{ width: '24px', height: 'auto' }} />
                                        :
                                        <CampaignIcon sx={{ width: '24px', height: 'auto' }} />}

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
export default CampaignRewardTypes;