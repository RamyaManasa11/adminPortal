import { Box, Button, Menu, Typography } from "@mui/material";
import { LoyaltyListingHeaderContainer } from "./Topheader.style";

interface props{
  handleAddNew: any;
  title: any;
}

const TopHeader = ({ handleAddNew, title}: props) => {
 
  return (
    <LoyaltyListingHeaderContainer>
      <Box>
        <Typography variant='h4' textTransform={'uppercase'}>
          {title}
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