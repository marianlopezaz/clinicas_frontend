import React from 'react';
import './Dashboard.css'

// Imports dependencias
import { Switch, Route, Redirect, matchPath} from 'react-router-dom';

// Import Componentes
import Estadisticas from '../../Components/Estadisticas/Estadisticas'
import Navbar from '../../Components/Layouts/NavBar/NavBar';
import Header from '../../Components/Layouts/Header/Header';
import NotFound404 from '../Errors/404/NotFound404';
import Especialistas from '../../Components/Especialistas/Especialistas';
import Usuarios from '../../Components/Usuarios/Usuarios';
import Perfil from '../../Components/Perfil/Perfil';
import SubRouter from '../SubRouter/SubRouter'

// Import Redux
import { useSelector } from 'react-redux'

const Dashboard = (props) =>{
    const user = useSelector(store => store.user.user)
    const client = useSelector(store => store.client.client)

    /* Path es una variable que devuelve un bool dependiendo si la ruta matchea con la especificada */
    let pathPacientes = !!matchPath(props.location.pathname,'/dashboard/pacientes/:id/:renderView');
    let pathConfiguracion = !!matchPath(props.location.pathname,'/dashboard/configuracion/:renderView');


        return (
            <div>
                <div id='navigation_container'>
                    <Header user={user} client={client} logoutUser={props.logoutUser}/>
                    
                    {!(pathPacientes || pathConfiguracion)?<Navbar user={user} client={client} /> : null }
                </div>
                <Switch>
                    <Route path='/dashboard/pacientes' component={()=> <SubRouter />}/>                                                                  
                    <Route exact path='/dashboard/estadisticas' component={Estadisticas}/>
                    <Route exact path='/dashboard/especialistas' component={Especialistas}/>
                    <Route exact path='/dashboard/profile' component={() => <Perfil user={user} client_host={client.host}/>}/>
                    {
                        (user.role === 'admin') ?
                            <div> 
                                <Route exact path='/dashboard/usuarios' component={() => <Usuarios user={user} client={client}/>}/>
                                <Route path='/dashboard/configuracion' component={() => <SubRouter />}/>
                            </div>
                        :
                            <Redirect to='/404' />
                    }
                    {/* Redirect 404 Error */}
                    <Route path='/404' component={NotFound404} />
                    <Redirect to='/404' />
                </Switch>
            </div>
        );
    
}

export default Dashboard;