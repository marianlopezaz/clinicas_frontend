import React, { Component } from "react";
import "./Usuarios.css";

// Import Componentes
import CrudUsers from "../../Utils/CrudUsers";
import ModalAdd from "./Modals/ModalAdd";

// Import dependencias
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css?v=2";
import "react-s-alert/dist/s-alert-css-effects/genie.css";
import Avatar from "react-avatar";
import Table from "../Layouts/Table/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { format } from "date-fns";

class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],

      inputFocusStyle: {
        outline: "none",
        border: "none",
        borderBottom: "solid",
        borderWidth: 2,
        color: "black",
        borderColor: this.props.client.main_color,
      },
      inputStyle: {
        outline: "none",
        border: "none",
        borderBottom: "solid",
        borderWidth: 1.5,
        color: "black",
        borderColor: "grey",
      },
      tableColumns: [
        { title: "id", field: "id", hidden: true },
        {
          title: "Foto",
          field: "imageUrl",
          render: (rowData) => (
            <Avatar
              className="user_avatar"
              name={rowData ? `${rowData.name} ${rowData.surname}` : ""}
              size="50"
              round={true}
              color="#C5C5C5"
            />
          ),
          editable: "never",
        },
        {
          title: "Nombre",
          field: "name",
          cellStyle: {
            textAlign: "left",
          },
          editComponent: (props) => (
            <input
              type="text"
              required={true}
              style={
                !this.state.onFocusName
                  ? this.state.inputStyle
                  : this.state.inputFocusStyle
              }
              onFocus={() => this.onFocus("Name")}
              onBlur={() => this.onBlur("Name")}
              autoFocus
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
            />
          ),
        },
        { title: "Apellido", field: "surname" },
        { title: "D.N.I", field: "dni", type: "numeric", textAlign: "left" },
        { title: "Celular", field: "cellphone", type: "numeric" },
        {
          title: "Fecha de Nacimiento",
          field: "birth",
          format: "dd/MM/yyyy",
          type: "date",
        },
        { title: "Email", field: "email" },
        {
          title: "Rol",
          field: "role",
          editComponent: (props) => (
            <select
              className="form-control select_users"
              type="text"
              required={true}
              style={
                !this.state.onFocusName
                  ? this.state.inputStyle
                  : this.state.inputFocusStyle
              }
              onFocus={() => this.onFocus("Name")}
              onBlur={() => this.onBlur("Name")}
              autoFocus
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
            >
              <option value="admin">Administrador</option>
              <option value="secretary" selected>
                Secretaria/o
              </option>
              <option value="specialist">Especialista</option>
            </select>
          ),
          render: (rowData) =>
            rowData.role === "admin"
              ? "Administrador"
              : rowData.role === "secretary"
              ? "Secretaria/o"
              : rowData.role === "specialist"
              ? "Especialista"
              : "",
        },
        { title: "Nombre de Usuario", field: "user_name" },
      ],
    };
  }

  componentDidMount() {
    if (this.props.client.host && this.props.user.auth_token) {
      CrudUsers.getUsers(
        this.props.user.auth_token,
        this.props.client.host
      ).then((result) => {
        if (result.success) {
          // Esto lo hago para formatear la fecha
          result.result.map((user) => {
            return (user.birth = new Date(user.birth));
          });
          this.setState({
            users: result.result,
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

  handleDeleteRow(user_id, indexTable) {
    CrudUsers.delete(
      user_id,
      this.props.user.auth_token,
      this.props.client.host
    ).then((result) => {
      if (result.success) {
        let data = this.state.users;
        data.splice(indexTable, 1);
        this.setState({ data });
        Alert.success(result.result, {
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

  handleEditRow(editedIndex, data, newData) {
    let userData = newData;
    userData.birth = new Date(userData.birth);
    userData.birth = format(userData.birth, "dd/MM/yyyy");
    CrudUsers.edit(userData, this.props.user.auth_token, this.props.client.host)
      .then((result) => {
        if (result.success) {
          data[editedIndex] = newData;
          this.setState({ data });
          Alert.success("Paciente editado correctamente", {
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
      })
      .catch((e) => {
        /* Do something with the error */
      });
  }

  onFocus = (field) => {
    var focusField = "onFocus" + field;
    this.setState({ [focusField]: true });
  };

  onBlur = (field) => {
    var focusField = "onFocus" + field;
    this.setState({ [focusField]: false });
  };

  handleSubmitModalAdd(user) {
    user.birth = new Date(user.birth);
    user.birth = format(user.birth, "dd/MM/yyyy");
    delete user.showPassword;
    CrudUsers.add(
      user,
      this.props.user.auth_token,
      this.props.client.host
    ).then((result) => {
      if (result.success) {
        this.setState({ users: this.state.users.concat(result.result) })
        Alert.success("Usuario agregado correctamente!", {
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

  render() {
    return (
      <div>
        <Row md={12}>
          <ModalAdd
            handleSubmitModalAdd={this.handleSubmitModalAdd.bind(this)}
            main_color={this.props.client.main_color}
          />
          <Col md={11} style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Table
              handleDeleteRow={this.handleDeleteRow.bind(this)}
              handleEditRow={this.handleEditRow.bind(this)}
              tableName="Usuarios"
              data={this.state.users}
              columns={this.state.tableColumns}
            ></Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Usuarios;
