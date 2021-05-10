import React, { Component } from "react";
import "./Perfil.css";

// Import dependencias
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css?v=2";
import "react-s-alert/dist/s-alert-css-effects/genie.css";
import { DatePicker } from "@material-ui/pickers";
import { format } from "date-fns";
import Avatar from "react-avatar";

// Import Componentes
import CrudUsers from "../../Utils/CrudUsers";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      user_name: "",
      dni: "",
      cellphone: "",
      birth: "",
      role: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    if (this.props.client_host) {
      CrudUsers.getCurrentUser(
        this.props.user.auth_token,
        this.props.client_host
      ).then((result) => {
        if (result.success) {
          this.setState({
            id: result.result.id,
            name: result.result.name,
            surname: result.result.surname,
            email: result.result.email,
            user_name: result.result.user_name,
            dni: result.result.dni,
            cellphone: result.result.cellphone,
            birth: new Date(result.result.birth),
            role: result.result.role,
          });
        } else {
          result.result.forEach((element) => {
            Alert.error(element.message, {
              position: "bottom-left",
              effect: "genie",
            });
          });
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = this.state;
    user.birth = format(user.birth, "dd/MM/yyyy");
    CrudUsers.edit(
      user,
      this.props.user.auth_token,
      this.props.client_host
    ).then((result) => {
      if (result.success) {
        Alert.success("Cambios guardados correctamente", {
          position: "bottom-left",
          effect: "genie",
        });
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom-left",
            effect: "genie",
          });
        });
      }
    });
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  handleDateChange(date) {
    this.setState({ birth: date });
  }

  render() {
    return (
      <div>
        <Row md={12} className="center">
          <Col md={12}>
            <form
              id="edit_client_form"
              action=""
              onSubmit={this.handleSubmit}
              method="post"
            >
              <Row md={12}>
                <Col md={12}>
                  <Avatar
                    name={`${this.state.name} ${this.state.surname}`}
                    size="100"
                    round={true}
                    color="#C5C5C5"
                  />
                </Col>
              </Row>
              <Row md={12} className="inputs_containers">
                <Col md={5} className="profile_input">
                  <p className="profile_label">Nombre de Usuario</p>
                  <input
                    name="user_name"
                    value={this.state.user_name}
                    onChange={this.handleChange}
                    placeholder="Nombre de Usuario"
                    className="form-control"
                    type="text"
                  />
                </Col>
                <Col md={5} className="profile_input">
                  <p className="profile_label">Email</p>
                  <input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email"
                    className="form-control"
                    type="email"
                  />
                </Col>
              </Row>
              <Row md={12} className="inputs_containers">
                <Col md={5} className="profile_input">
                  <p className="profile_label">Nombre</p>
                  <input
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Nombre"
                    className="form-control"
                    type="text"
                  />
                </Col>
                <Col md={5} className="profile_input">
                  <p className="profile_label">Apellido</p>
                  <input
                    name="surname"
                    value={this.state.surname}
                    onChange={this.handleChange}
                    placeholder="Apellido"
                    className="form-control"
                    type="text"
                  />
                </Col>
              </Row>
              <Row md={12} className="last_inputs_container">
                <Col md={3} className="profile_input">
                  <p className="profile_label">Fecha de Nacimiento</p>
                  <DatePicker
                    className="date_picker"
                    variant="inline"
                    value={this.state.birth}
                    onChange={(date) => this.handleDateChange(date)}
                    format="dd/MM/yyyy"
                  />
                  {/* <input name='birth' value={this.state.birth} onChange={this.handleChange} placeholder='Fecha de Nacimiento' className='form-control' type='date'/> */}
                </Col>
                <Col md={4} className="profile_input">
                  <p className="profile_label">DNI</p>
                  <input
                    name="dni"
                    value={this.state.dni}
                    onChange={this.handleChange}
                    placeholder="DNI"
                    className="form-control"
                    type="number"
                  />
                </Col>
                <Col md={3} className="profile_input">
                  <p className="profile_label">Celular</p>
                  <input
                    name="cellphone"
                    value={this.state.cellphone}
                    onChange={this.handleChange}
                    placeholder="Celular"
                    className="form-control"
                    type="tel"
                  />
                </Col>
              </Row>
              <Row md={12} style={{ marginTop: 20 }}>
                <Col md={12}>
                  <button
                    type="submit"
                    title="Guardar Cambios"
                    id="submit_profile_update"
                  >
                    GUARDAR
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Perfil;
