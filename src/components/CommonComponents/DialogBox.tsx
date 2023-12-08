import { DialogContent, DialogTitle, IconButton} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import UpdateCampaign from "../CampaignSections/UpdateCampaign";
import UpdateReward from "../RewardSections/UpdateReward";

interface props {
    address: string;
    handleClose: any;
}

const DialogBox = ({ address, handleClose}: props) => {
    return (
        <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Edit Details
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme: { palette: { grey: any[]; }; }) => theme.palette.grey[500],
                }}
            >
                <CloseIcon onClick={handleClose} />
            </IconButton>
            <DialogContent dividers>
                {(window.location.pathname==='/reward')? <UpdateReward address={address} handleUpdate={handleClose}/>:
                <UpdateCampaign address={address} handleUpdate={handleClose} />}
            </DialogContent>
        </>
    )
}

export default DialogBox
