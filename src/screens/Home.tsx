import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import MiniDrawer from "../components/SideBar";
import { Box, Container, Typography
} from '@mui/material';

const Home = () => {

    const history = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("UserName")) history("/login");
    }, []);
    
    return (
        <>
        <Box sx={{display:'flex', marginTop:'100px'}} >
          <MiniDrawer/>
          
          <Container fixed>        
            <Typography textAlign={"center"}>
                <h1>Hi Admin, Welcome Back !!!!</h1>
            </Typography>               
            </Container>
        </Box>
        </>
    )
}

export default Home
