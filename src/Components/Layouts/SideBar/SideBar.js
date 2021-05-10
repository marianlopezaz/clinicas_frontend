import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import './SideBar.css'
import ComponentSidebar from './ComponentSidebar/ComponentSidebar';



class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSidebar:this.props.dataSidebar,
            isSelected: window.location.href.match(/\/([^/]+)\/?$/)[1]
        }
    }

    render() {
        return ( 
            <Row md={12}>
                {this.state.dataSidebar.map((block,index) => ComponentSidebar(block,index,this.state.isSelected))}
            </Row>
        );
    }
}



export default SideBar;