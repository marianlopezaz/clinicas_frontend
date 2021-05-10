import React,{ Component } from 'react';
import { Form,Col,Modal } from 'react-bootstrap';
import { DatePicker } from '@material-ui/pickers';
import './AddPatientModal.css'
import ClipLoader from "react-spinners/ClipLoader";
import CrudPatients from '../../../Utils/CrudPatients';
import Alert from 'react-s-alert';
import Avatar from 'react-avatar';
import { Row } from 'react-bootstrap';

class AddPatientModal extends Component{
 
  constructor(props){
    var today = new Date();
    super(props);
    this.state = {
        patient_photo:'default',
        patient_name:'',
        patient_surname: '',
        patient_phone:'',
        patient_dni:'',
        patient_birth: `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}`,
        patient_email:'',
        show: this.props.showModal,
        title: this.props.title,
        main_color: this.props.client.main_color,
        loading:false,
        modalSuccess:false,
        patient_added: ''
        
    }
  }

  handleDateChange = (date) =>{
    this.setState({ patient_birth : date });
}


handleSubmit = (e) =>{
  e.preventDefault();
  this.setState({loading:true});
  let patientData = {
    name:this.state.patient_name,
    surname:this.state.patient_surname,
    dni:this.state.patient_dni,
    cellphone:this.state.patient_phone,
    birth:this.state.patient_birth,
    email:this.state.patient_email,
    photo:this.state.patient_photo,
  }
  

  CrudPatients.addNewPatient(this.props.auth_token,this.props.client.host,patientData).then((result)=>{
    if(result.success){
      let newRow = result.result

      this.props.handleAddRow(newRow)
      this.setState({patient_added:newRow,modalSuccess: true,loading: false})

  }else{
    this.setState({loading: false})

    Alert.error(result.result, {
        position: 'bottom-left',
        effect: 'genie', 
      });
  }
  })
}

handleChange = (e)=>{
  let name = e.target.name;
  let value = e.target.value;
  this.setState({ [name] : value });
}


handleModalSuccess = (value) =>{
  this.setState({modalSuccess:value})
}

  render(){
        
      if(!this.state.modalSuccess){

          return (
            <Modal show={this.state.show} size={'lg'} className="add_modal_container" onHide={()=>this.props.handleModal(false)}>
                
                <Modal.Header>
                    <Modal.Title>{this.state.title}</Modal.Title>
                    <button onClick={()=>this.props.handleModal(false)} id="close_modal_button">X</button>
                </Modal.Header>

                <Modal.Body>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Row>

                      <Col style={{textAlign:'center',marginBottom:10}}> <Avatar className='user_avatar' 
                                        name={`${this.state.patient_name} ${this.state.patient_surname}`} 
                                        size="100" 
                                        round={true} 
                                        color='#C5C5C5'
                                />
                      </Col>
                            
                    </Form.Row>
                      <Form.Row>
                          <Col>
                          <input className= "input_add_patient_modal"
                              value = {this.state.patient_name}
                              placeholder="Nombre"
                              required
                              name='patient_name'
                              onChange = {(e)=>{this.handleChange(e)}}
                          />   
                          </Col>
                          <Col>
                          <input className= "input_add_patient_modal"
                              value = {this.state.patient_surname}
                              placeholder="Apellido"
                              required
                              name='patient_surname'
                              onChange = {(e)=>{this.handleChange(e)}}
                          /> 
                          </Col>
                      </Form.Row>

                      <Form.Row>
                          <Col>
                          <input className= "input_add_patient_modal"
                              min={0}
                              maxLength = {8}
                              required
                              value = {this.state.patient_dni}
                              placeholder="D.N.I"
                              name='patient_dni'
                              onChange = {(e)=>{this.handleChange(e)}}
                              type='number'
                              
                          />   
                          </Col>
                          <Col>
                          <input className= "input_add_patient_modal"
                              value = {this.state.patient_phone}
                              placeholder="Teléfono"
                              required
                              name='patient_phone'
                              onChange = {(e)=>{this.handleChange(e)}}
                          /> 
                          </Col>
                      </Form.Row>

                      <Form.Row md={12}>
                          <Col>
                    
                            <DatePicker id="date_label"
                                              variant="inline"
                                              required
                                              value={this.state.patient_birth}
                                              onChange={(date) => this.handleDateChange(date)}
                                              format="dd/mm/yyyy"
                                              disableFuture
                                              invalidDateMessage=""
                                              InputProps={{
                                                disableUnderline: true,
                                              }}
                                          />                    
                          </Col>

                          <Col>
                          <input id="email_label" className= "input_add_patient_modal"
                              value = {this.state.patient_email}
                              placeholder="Email"
                              name='patient_email'
                              type="email"
                              required
                              onChange = {(e)=>{this.handleChange(e)}}
                          /> 
                          </Col>
                      </Form.Row>

                      <Form.Row>
                        {
                          !this.state.loading? 
                            <button type="submit" className="add_button_modal">
                              Agregar
                            </button>
                            :
                            <ClipLoader
                            css={[
                                {display:'flex'},
                                {margin: '0 auto'},
                                {marginBottom: 25},
                                {borderColor: this.state.main_color}
                              ]}
                            size={35}
                            loading={this.state.loading}
                          />
                        }
                     
                      </Form.Row>

                  </Form>
                </Modal.Body>
                </Modal>
            );
        }else{
          return(
            <Modal show={this.state.modalSuccess} size={'lg'} className="add_modal_container">
                <Modal.Header>
                    <span class="modal_success_title">Paciente Agregado Exitosamente!</span>
                    <button onClick={()=>this.handleModalSuccess(false)} id="close_modal_button">X</button>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col style={{textAlign:"center"}}>
                    <a href={`/dashboard/pacientes/${this.state.patient_added.id}/Treatments`}>
                    <button className="add_button_modal" 
                            onClick={()=>{
                              sessionStorage.setItem('patientData',JSON.stringify(this.state.patient_added))}}>
                              Ir a Tratamientos
                    </button>
                    </a>
                    </Col>
                  </Row>
                    
                </Modal.Body>
            </Modal>
          );
        }
      }
  }


export default AddPatientModal;