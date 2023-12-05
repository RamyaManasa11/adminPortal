import MiniDrawer from '../components/SideBar';
import { Box, Container,Grid,Card,ListItem,ListItemText,IconButton, Typography, SvgIcon} from '@mui/material';
import TopHeader from "../components/TopHeader";
import { useEffect,useState } from 'react';
import loyaltyCampaignApi from '../API/campaign/loyalty.campaign.api';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router';
import CampaignIcon from '@mui/icons-material/Campaign';
import '../App.css';
import { format } from 'date-fns';

const useStyles = makeStyles ({
    card: {
        border: "1px solid cornflowerblue"
    }
});

const Campaign=()=>{
    interface List{
        title:string;
        description:string;
        startTime:any;
        contractAddress:any;
    }

    const [list, setList] = useState<List[]>([]);
    const classes = useStyles();
    const navigate = useNavigate();

    const handleCardClick = (address:any) =>{
        navigate(
            `/create-campaign?path=${address}`
          );
    }

    const getStartDate = (startTime:any) =>{
        const timeStamp = (startTime.length) > 10 ?((startTime/1000) * 1000): (startTime*1000);
        const d = new Date (timeStamp);
        const newDate = d.toLocaleDateString('en-US', { year : 'numeric', month: 'numeric', day: 'numeric' });
        const formattedDate = format(new Date(newDate),'MMM d, yyyy | hh:mm')
        return formattedDate;
    }

    const getList = async () => {
        const listRes: any = await loyaltyCampaignApi.getCampainList();
        setList((listRes.result).reverse());
    };

    useEffect(() => {
        getList();
    }, []);

    return(
        <>
        <Box sx={{display:'flex', marginTop:'55px', background:"ghostwhite"}} >
          <MiniDrawer/>  
          <Container fixed>
            <TopHeader 
                title="CAMPAIGN"
            />
            <Grid container spacing={2}>
                {list.map(item => (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Card variant='elevation' classes={{ root: classes.card }} onClick={() => handleCardClick(item.contractAddress)}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="update">
                                        <EditIcon />
                                        </IconButton>
                                    }
                                >
                                <Box sx={{paddingRight:"30px"}}>
                                    <SvgIcon color='primary' fontSize='large'>
                                        <CampaignIcon/>
                                    </SvgIcon>
                                </Box>
                                <ListItemText
                                    primary={item.title}
                                    secondary={item.description}
                                />
                                <Box className='datetimemob'>
                                    <Typography component='div'>
                                        {
                                            getStartDate(item.startTime)
                                        }
                                    </Typography>
                                </Box>
                                </ListItem>   
                        </Card>
                    </Grid>
                ))}
            </Grid>
         </Container>
        </Box>
        </>
    )
}
export default Campaign