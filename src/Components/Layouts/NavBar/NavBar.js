import React, { Component } from 'react';
import './NavBar.css';

// Import Dependecias
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';
import pacientes from './Images/pacientes.svg';
import especialistas from './Images/especialista.svg';
import estadisticas from './Images/stats.svg';
import usuarios from './Images/users.svg';
import config from './Images/config.svg'

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSelected : window.location.href.match(/\/([^/]+)\/?$/)[1]
        }
    }

    getSelected(element){
        if(this.state.isSelected === element){
            return {
                padding: '20px 40px',
                borderBottom: `3px solid ${this.props.client.main_color}`
            };
        }else{
            return {};
        }
    }

    changeSelected(selected){
        this.setState({isSelected:selected});
    }

    render() {
        return (
            
            <div id='navbar_container'>
                <Row md={12}>
                    <Col md={12} id='navbar_col_container'>
                        {
                            (this.props.user.role === 'secretary') ?
                                <Row md={12}>
                                    <Col md={4} className='center'>
                                        <NavLink id='estadisticas' onClick={this.changeSelected.bind(this, 'estadisticas')} className='navbar-item' style={this.getSelected('estadisticas')}  title='Estadísticas' to='/dashboard/estadisticas'><span><img id='estadisticas_logo' src={estadisticas} className="navbar_logos" alt="logo" /></span>Estadísticas</NavLink>
                                    </Col>
                                    <Col md={4} className='center'>
                                        <NavLink id='pacientes' onClick={this.changeSelected.bind(this, 'pacientes')} className='navbar-item' style={this.getSelected('pacientes')} title='Pacientes' to='/dashboard/pacientes'><span><img src={pacientes} className="navbar_logos" alt="logo" /></span>Pacientes</NavLink>
                                    </Col>
                                    <Col md={4} className='center'>
                                        <NavLink id='especialistas' onClick={this.changeSelected.bind(this, 'especialistas')} className='navbar-item' style={this.getSelected('especialistas')} title='Especialistas' to='/dashboard/especialistas'><span><img src={especialistas} className="navbar_logos" alt="logo" /></span>Especialistas</NavLink>
                                    </Col>
                                </Row>
                            : (this.props.user.role === 'admin')?
                                <Row md={12}>    
                                    <Col md={2} className='center'>
                                        <NavLink id='estadisticas' onClick={this.changeSelected.bind(this, 'estadisticas')} className='navbar-item' style={this.getSelected('estadisticas')}  title='Estadísticas' to='/dashboard/estadisticas'><span><img id='estadisticas_logo' src={estadisticas} className="navbar_logos" alt="logo" /></span>Estadísticas</NavLink>
                                    </Col>
                                    <Col md={3} className='center'>
                                        <NavLink id='pacientes' onClick={this.changeSelected.bind(this, 'pacientes')} className='navbar-item' style={this.getSelected('pacientes')} title='Pacientes' to='/dashboard/pacientes'><span><img src={pacientes} className="navbar_logos" alt="logo" /></span>Pacientes</NavLink>
                                    </Col>
                                    <Col md={2} className='center'>
                                        <NavLink id='especialistas' onClick={this.changeSelected.bind(this, 'especialistas')} className='navbar-item' style={this.getSelected('especialistas')} title='Especialistas' to='/dashboard/especialistas'><span><img src={especialistas} className="navbar_logos" alt="logo" /></span>Especialistas</NavLink>
                                    </Col>
                                    <Col md={3} className='center'>
                                        <NavLink id='usuarios' onClick={this.changeSelected.bind(this, 'usuarios')} className='navbar-item' style={this.getSelected('usuarios')} title='Especialistas' to='/dashboard/usuarios'><span><img src={usuarios} className="navbar_logos" alt="logo" /></span>Usuarios</NavLink>
                                    </Col>
                                    <Col md={2} className='center'>
                                        <NavLink id='configuracion' onClick={this.changeSelected.bind(this, 'configuracion')} className='navbar-item' style={this.getSelected('configuracion')} title='Configuración' to='/dashboard/configuracion/configuracionObras'><span><img src={config} className="navbar_logos" alt="logo" /></span>Configuración</NavLink>
                                    </Col>
                                </Row>
                            : (this.props.user.role === 'specialist') ?
                                // Ver que va a tener aca
                                <Row md={12}>
                                    <Col md={4} className='center'>
                                        <NavLink id='estadisticas' onClick={this.changeSelected.bind(this, 'estadisticas')} className='navbar-item' style={this.getSelected('estadisticas')}  title='Estadísticas' to='/dashboard/estadisticas'><span><img id='estadisticas_logo' src={estadisticas} className="navbar_logos" alt="logo" /></span>Estadísticas</NavLink>
                                    </Col>
                                    <Col md={4} className='center'>
                                        <NavLink id='pacientes' onClick={this.changeSelected.bind(this, 'pacientes')} className='navbar-item' style={this.getSelected('pacientes')} title='Pacientes' to='/dashboard/pacientes'><span><img src={pacientes} className="navbar_logos" alt="logo" /></span>Pacientes</NavLink>
                                    </Col>
                                    <Col md={4} className='center'>
                                        <NavLink id='especialistas' onClick={this.changeSelected.bind(this, 'especialistas')} className='navbar-item' style={this.getSelected('especialistas')} title='Especialistas' to='/dashboard/especialistas'><span><img src={especialistas} className="navbar_logos" alt="logo" /></span>Especialistas</NavLink>
                                    </Col>
                                </Row>
                            : <Row md={12}></Row>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NavBar;