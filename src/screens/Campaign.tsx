import MiniDrawer from '../components/SideBar';
import { Box, Container, Grid, Card, ListItem, ListItemText, IconButton, Typography, SvgIcon, Skeleton, } from '@mui/material';
import TopHeader from "../components/TopHeader";
import { useEffect, useState } from 'react';
import loyaltyCampaignApi from '../API/campaign/loyalty.campaign.api';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router';
import CampaignIcon from '@mui/icons-material/Campaign';
import '../App.css';
import { format } from 'date-fns';
import { Dialog } from '@mui/material';
import DialogBox from '../components/CommonComponents/DialogBox';

const useStyles = makeStyles({
    card: {
        border: "1px solid cornflowerblue"
    }
});

const Campaign = () => {
    interface List {
        title: string;
        description: string;
        startTime: any;
        contractAddress: any;
    }

    const [list, setList] = useState<List[]>([]);
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [add, setadd] = useState("");

    const handleOpen = (address: any) => {
        setOpen(true);
        setadd(address)
    }

    const handleClose = () => {
        getList();
        setOpen(false);
    }

    const getStartDate = (startTime: any) => {
        const timeStamp = (startTime.length) > 10 ? ((startTime / 1000) * 1000) : (startTime * 1000);
        const d = new Date(timeStamp);
        const newDate = d.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        const formattedDate = format(new Date(newDate), 'MMM d, yyyy | hh:mm')
        return formattedDate;
    }

    const getList = async () => {
        try {
            const listRes: any = await loyaltyCampaignApi.getCampainList();
            setList((listRes.result).reverse());
        }
        catch (err: any) {
            console.log(err);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    const handleAddNew = () => {
        navigate('/create-campaign');
    };
    return (
        <>
            <Box sx={{ display: 'flex', marginTop: '55px', background: "ghostwhite" }} >
                <MiniDrawer />
                <Container fixed>
                    <TopHeader
                        title="CAMPAIGN"
                        handleAddNew={handleAddNew}
                    />
                    <Grid container spacing={2}>
                        {list.map((item, index) => (
                            <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                                <Card variant='elevation' classes={{ root: classes.card }} onClick={() => handleOpen(item.contractAddress)}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="update">
                                                <EditIcon />
                                            </IconButton>
                                        }
                                    >
                                        <Box sx={{ paddingRight: "30px" }}>
                                            <SvgIcon color='primary' fontSize='large'>
                                                <CampaignIcon />
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
                        <Dialog onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            PaperProps={{
                                style: {
                                    boxShadow: 'none',
                                    width: '100%',
                                    height: 'auto'
                                },
                            }}
                        >
                            <DialogBox address={add} handleClose={handleClose} />
                        </Dialog>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
export default Campaign
