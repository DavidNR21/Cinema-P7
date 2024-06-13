import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home/Home"
import Cadastro from "../pages/Cadastro/Cadastro"
import Login from "../pages/Login/Login"
import Salas from "../pages/Salas/Salas"
import Perfil from "../pages/Perfil/Perfil"
import Reservas from "../pages/Reservas/Reservas"
import RedefinirSenha from "../pages/RedefinirSenha/RedefinirSenha"
import Manager from "../pages/Manager/Manager"
import ManagerCine from "../pages/Manager/ManegerCine"
import ManagerSalas from "../pages/Manager/ManegerSalas"


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
                <Route path="/Redefinir/:state" element = { <RedefinirSenha /> } />
                <Route path="/Manager/filme/:alt" element = { <Manager /> } />
                <Route path="/Manager/cine/:propi/:p" element = { <ManagerCine /> } />
                <Route path="/Manager/salas/" element = { <ManagerSalas /> } />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes
