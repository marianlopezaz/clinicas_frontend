import React, { Component } from 'react';

//Import dependencias
import logout_user_icon from './images/logout.svg'
import './Header.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from 'react-avatar';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
     
        return (
            
            <Row md={12} className="header_container" style={{ backgroundColor : this.props.client.main_color }}>
 
                    <Col md={8}>
                        <img alt='Logo' id="logo_cliente_header" src={this.props.client.logo_url}></img>
                    </Col>

                    <Col md={3} className="col_user_name_container">
                        <Row>
                            <Col>
                                <NavLink to='/dashboard/profile' title='Ver Perfil' >
                                    <Avatar className='user_avatar' name={`${this.props.user.name} ${this.props.user.surname}`} size="50" round={true} color='#C5C5C5'/>
                                    <Row className='user_container_row'>
                                    <Row>
                                            <Col className="col_user_name">
                                                <span id="user_name">{this.props.user.name} {this.props.user.surname}</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="col_user_rol">
                                                <span id="user_rol">{this.props.user.role}</span>
                                            </Col>   
                                        </Row> 
                                    </Row>
                                </NavLink>
                                <NavLink title='Ver Perfil' to='/dashboard/profile' id='see_profile_link'><i className="fas fa-angle-right" id='see_profile_arrow'></i></NavLink>
              
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col md={1} className="col_logout_icon_container">
                        <img alt='Logout' title='Cerrar Sesión' id="logout_user_icon" src={logout_user_icon} onClick={()=>this.props.logoutUser()}></img>
                    </Col>
                       

            </Row>


        );
    }
}

export default Header;