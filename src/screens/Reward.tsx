import MiniDrawer from '../components/SideBar';
import TopHeader from '../components/TopHeader';
import { useEffect, useState } from 'react';
import loyaltyRewardApi from '../API/reward/loyalty.reward.api';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Container, Grid, Card, ListItem, ListItemText, IconButton, SvgIcon } from '@mui/material';
import { Typography, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router';
import '../App.css';
import { format } from 'date-fns';

const useStyles = makeStyles({
    card: {
        border: "1px solid cornflowerblue"
    }
});

const Reward = () => {
    interface List {
        title: string;
        description: string;
        contractAddress: any;
        startTime: any;
    }

    const [list, setList] = useState<List[]>([]);
    const classes = useStyles();
    const navigate = useNavigate();

    const handleCardClick = (address: any) => {
        navigate(`/update-reward?path=${address}`)
    }

    const getStartDate = (startTime: any) => {
        const timeStamp = (startTime.length) > 10 ? ((startTime / 1000) * 1000) : (startTime * 1000);
        const d = new Date(timeStamp);
        const newDate = d.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        const formattedDate = format(new Date(newDate), 'MMM d, yyyy | hh:mm')
        return formattedDate;
    }

    const getList = async () => {
        const listRes: any = await loyaltyRewardApi.getRewardList();
        setList((listRes.result).reverse());
    };

    useEffect(() => {
        getList();
    }, []);

    const handleAddNew = () => {
        navigate('/create-reward');
    };

    return (
        <Box sx={{ display: 'flex', marginTop: '55px', background: "ghostwhite" }} >
            <MiniDrawer />
            <Container fixed>
                <TopHeader
                    title="REWARD"
                    handleAddNew={handleAddNew}
                />
                <Grid container spacing={2}>
                    {list.map((item, index) => (
                        <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                            <Card variant='elevation' classes={{ root: classes.card }} onClick={() => handleCardClick(item.contractAddress)}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="update">
                                            <EditIcon />
                                        </IconButton>
                                    }
                                >
                                    <Box sx={{ paddingRight: "30px" }}>
                                        <SvgIcon color='primary' fontSize='large'>
                                            <EmojiEventsIcon />
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
    )
}
export default Reward