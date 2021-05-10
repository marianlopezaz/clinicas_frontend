import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import pacientes from '../../../NavBar/Images/pacientes.svg'

export default (props)=>{

    return(
    <Col md={4}>
        <NavLink to={props.url} className="navbar-item" style={props.style}>             
            <span>
                <img src={pacientes}  className="navbar_logos"/>
            </span>
            Información General
        </NavLink>
    </Col>
    
    );
}