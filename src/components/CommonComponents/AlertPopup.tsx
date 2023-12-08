import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface props {
  handleClick: any;
  open: any;
}
const AlertPopup = ({ handleClick }: props) => {
  const history = useNavigate();

  const handleClose = () => {
    history(-1);
  };

  return (
    <div>
      <DialogTitle id="alert-dialog-title">
        {"Do you want to Exit?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you don't wish to create a new Campaign or reward then you can click on Agree or if you wish to create then click on Disagree
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </div>
  )
}

export default AlertPopup;
