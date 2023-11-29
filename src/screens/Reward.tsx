import MiniDrawer from '../components/SideBar';
import {Box, Container} from '@mui/material';
import TopHeader from '../components/TopHeader';
const Reward=()=>{
    return(
        <Box sx={{display:'flex', marginTop:'50px'}} >
          <MiniDrawer/>
          <Container fixed>
            <TopHeader 
                title="REWARD"
            />
            </Container>
        </Box>
      
    )
}
export default Reward