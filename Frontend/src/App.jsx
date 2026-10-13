import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./slice/authSlice";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App(){
const dispatch = useDispatch()

useEffect(()=>{
    dispatch(getCurrentUser());
},[dispatch]);


return(
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>
    </BrowserRouter>

)
}


export default App