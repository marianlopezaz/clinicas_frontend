
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import insurance from './images/insurance.svg'


export default (props)=>{

    return(

    <Col md={6}>
        <NavLink to={props.url} className="navbar-item" style={props.style}>             
            <span>
                <img src={insurance} alt='' style={{width:25,top:0}} className="navbar_logos"/>
            </span>
            Obras Sociales
        </NavLink>
    </Col>

    );
}