import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";
import { DatePicker } from "@material-ui/pickers";
import CrudPatients from "../../../../Utils/CrudPatients";
import Alert from "react-s-alert";
import ClipLoader from "react-spinners/ClipLoader";
import { format } from "date-fns";
/* CSS */
import "./PatientInfo.css";

class PatientInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient_id: this.props.patientData.id,
      patient_photo: this.props.patientData.photo,
      patient_name: this.props.patientData.name,
      patient_surname: this.props.patientData.surname,
      patient_phone: this.props.patientData.cellphone,
      patient_dni: this.props.patientData.dni,
      patient_birth: new Date(this.props.patientData.birth),
      patient_email: this.props.patientData.email,
      loading: false,
    };
  }

  handleChange(e) {
    let state = e.target.name;
    let value = e.target.value;

    this.setState({ [state]: value });
  }
  handleDateChange(date) {
    this.setState({ patient_birth: date });
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    let patientData = {
      id: this.state.patient_id,
      name: this.state.patient_name,
      surname: this.state.patient_surname,
      dni: this.state.patient_dni,
      cellphone: this.state.patient_phone,
      birth: format(this.state.patient_birth, "dd/MM/yyyy"),
      email: this.state.patient_email,
      photo: this.state.patient_photo,
    };

    CrudPatients.editPatient(
      this.props.user.auth_token,
      this.props.client.host,
      patientData
    )
      .then((result) => {
        if (result.success) {
          Alert.success("Paciente editado correctamente", {
            position: "bottom-left",
            effect: "genie",
          });

          sessionStorage.setItem("patientData", JSON.stringify(patientData));
        } else {
            result.result.forEach(element => {
                Alert.error(element.message, {
                position: 'bottom-left',
                effect: 'genie', 
                })
            });
        }

        this.setState({ loading: false });
      })
      .catch((e) => {
        /* Do something with the error */
      });
  };

  /* handleSubmit(e){
    e.preventDefault();
    let user = this.state;
    user.birth = format(user.birth, 'dd/MM/yyyy');
    CrudUsers.edit(user, this.props.user.auth_token, this.props.client_host).then(result => {
        if(result.success){
            Alert.success('Cambios guardados correctamente', {
                position: 'bottom-left',
                effect: 'genie', 
            });
        }else{
            Alert.error(result.result, {
                position: 'bottom-left',
                effect: 'genie', 
            });
        }
    })
}
 */
  render() {
    return (
      <div>
        <Row md={12} className="center">
          <Col md={12}>
            <form
              id="edit_patient_info"
              onSubmit={this.handleSubmit}
              method="post"
            >
              <Row md={12} className="input__avatar_containers">
                <Col md={12} className="photo_patient">
                  <Avatar
                    className="user_avatar"
                    name={`${this.state.patient_name} ${this.state.patient_surname}`}
                    size="100"
                    round={true}
                    color="#C5C5C5"
                  />
                </Col>
              </Row>

              <Row md={12} className="inputs_containers">
                <Col md={3} className="patient_input">
                  <p className="patient_info_label">Nombre del Paciente</p>
                  <input
                    name="patient_name"
                    value={this.state.patient_name}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Nombre del Paciente"
                    className="form-control"
                    type="text"
                  />
                </Col>

                <Col md={3} className="patient_input">
                  <p className="patient_info_label">Apellido del Paciente</p>
                  <input
                    name="patient_surname"
                    value={this.state.patient_surname}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Apellido del Paciente"
                    className="form-control"
                    type="text"
                  />
                </Col>

                <Col md={3} className="patient_input">
                  <p className="patient_info_label">D.N.I del Paciente</p>
                  <input
                    name="patient_dni"
                    value={this.state.patient_dni}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="D.N.I del Paciente"
                    className="form-control"
                    type="number"
                  />
                </Col>
              </Row>

              <Row md={12} className="inputs_containers">
                <Col md={3} className="patient_input">
                  <p className="patient_info_label">Teléfono del Paciente</p>
                  <input
                    name="patient_phone"
                    value={this.state.patient_phone}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Teléfono del Paciente"
                    className="form-control"
                    type="tel"
                  />
                </Col>

                <Col md={3} className="patient_input">
                  <p className="patient_info_label">Fecha de Nacimiento</p>
                  <DatePicker
                    className="date_picker"
                    variant="inline"
                    value={this.state.patient_birth}
                    onChange={(date) => this.handleDateChange(date)}
                    format="dd/MM/yyyy"
                    invalidDateMessage=""
                  />
                </Col>
                <Col md={3} className="patient_input">
                  <p className="patient_info_label">Email del Paciente</p>
                  <input
                    name="patient_email"
                    value={this.state.patient_email}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Email del Paciente"
                    className="form-control"
                    type="email"
                  />
                </Col>
              </Row>

              <Row md={12} style={{ marginTop: 20 }}>
                <Col md={12}>
                  {this.state.loading ? (
                    <ClipLoader
                      css={[
                        { display: "block" },
                        { margin: "0 auto" },
                        { borderColor: this.props.client.main_color },
                      ]}
                      size={35}
                      loading={this.state.loading}
                    />
                  ) : (
                    <button
                      type="submit"
                      title="Guardar Cambios"
                      id="submit_patient_info"
                      onClick={(e) => {
                        this.handleEdit(e);
                      }}
                    >
                      GUARDAR
                    </button>
                  )}
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PatientInfo;
