import React, { Component } from 'react';
import { Row,Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


//CSS
import './SubHeader.css';
import SideBar from '../SideBar/SideBar';

class SubHeader extends Component {

    render() {
        return (
            <Row md={12} className="header_user_container">

                <Col md={1} className="arrow_back_container">

                    <NavLink to="/dashboard/pacientes" className="arrow_back_navlink">
                        
                        <IconButton color='inherit' className="arrow_back_container">

                            <ArrowBackIcon className="arrow_back" style={{color:'#a9a9aa'}}/>

                        </IconButton>
                        
                    </NavLink>
                </Col>
                <Col md={11} style={{textAlign:'center'}}>
                    <SideBar dataSidebar={this.props.dataSidebar}/>
                </Col>

            </Row>
        );
    }
}


export default SubHeader;