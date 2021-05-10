import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import treatment from './images/treatment.svg'


export default (props)=>{

    return(
    <Col md={4}>
        <NavLink to={props.url} className="navbar-item" style={props.style}>             
            <span>
                <img src={treatment}  style={{width:25}} className="navbar_logos"/>
            </span>
            Tratamientos
        </NavLink>
    </Col>
    );
}