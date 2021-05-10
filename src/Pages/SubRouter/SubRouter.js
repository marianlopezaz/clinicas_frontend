import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import Paciente from '../../Components/Paciente/Paciente';
import Pacientes from '../../Components/Pacientes/Pacientes';
import Configuracion from '../../Components/Configuracion/Configuracion'


const SubRouter = (props) =>  {

  let { url } = useRouteMatch();

  return (
        <Switch>
          <Route exact path='/dashboard/pacientes'>
            <Pacientes url={url}/>
          </Route>
          <Route exact path='/dashboard/configuracion/:renderView'>
            <Configuracion />
          </Route>
          <Route path='/dashboard/pacientes/:patientId/:renderView'>
            <Paciente />
          </Route>
      </Switch>
  )

}

export default SubRouter;
