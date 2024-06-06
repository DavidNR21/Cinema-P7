import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home/Home"
import Cadastro from "../pages/Cadastro/Cadastro"
import Login from "../pages/Login/Login"
import Salas from "../pages/Salas/Salas"
import Perfil from "../pages/Perfil/Perfil"
import Reservas from "../pages/Reservas/Reservas"
import RedefinirSenha from "../pages/RedefinirSenha/RedefinirSenha"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element = { <Home /> } />
                <Route path="/Salas" element = { <Salas /> } />
                <Route path="/Login" element = { <Login /> } />
                <Route path="/Cadastro" element = { <Cadastro /> } />
                <Route path="/Perfil" element = { <Perfil /> } />
                <Route path="/Reservas/:id" element = { <Reservas /> } />
                <Route path="/Redefinir" element = { <RedefinirSenha /> } />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes
