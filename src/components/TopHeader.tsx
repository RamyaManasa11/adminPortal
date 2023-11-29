import { Box, Button, Menu, Typography } from "@mui/material";
import { LoyaltyListingHeaderContainer } from "./Topheader.style";
import { useNavigate } from "react-router";

const TopHeader = (props:any) => {
//   const navigate = useNavigate();
  const handleAddNew = () => {
    // navigate('/create-campaign');
  };
  return (
    <LoyaltyListingHeaderContainer>
      <Box>
        <Typography variant='h4' textTransform={'uppercase'}>
          {props.title}
        </Typography>
      </Box>
      <Button
          variant='outlined'
          sx={{
            display: { xs: 'none', sm: 'flex' },
            marginLeft: '10px',
            textTransform: 'capitalize',
          }}
          onClick={handleAddNew}
        >
          {'ADD NEW'}
        </Button>
      
    </LoyaltyListingHeaderContainer>
  )
};
export default TopHeader;