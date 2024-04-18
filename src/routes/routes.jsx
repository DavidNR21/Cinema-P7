import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home/Home"
import Cadastro from "../pages/Cadastro/Cadastro"
import Login from "../pages/Login/Login"
import Salas from "../pages/Salas/Salas"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element = { <Home /> } />
                <Route path="/Salas" element = { <Salas /> } />
                <Route path="/Login" element = { <Login /> } />
                <Route path="/Cadastro" element = { <Cadastro /> } />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes
