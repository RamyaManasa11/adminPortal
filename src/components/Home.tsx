import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Home = () => {

    const history = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("UserName")) history("/login");
    }, []);
    
    return (
        <div>
            Hi hello
        </div>
    )
}

export default Home
