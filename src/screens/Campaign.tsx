import MiniDrawer from '../components/SideBar';
import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material';
import TopHeader from "../components/TopHeader";
const Campaign=()=>{
    return(
        <>
        <Box sx={{display:'flex', marginTop:'50px'}} >
          <MiniDrawer/>  
          <Container fixed>
            <TopHeader 
                title="CAMPAIGN"
            />
          
         </Container>
        </Box>
        </>
      
    )
}
export default Campaign