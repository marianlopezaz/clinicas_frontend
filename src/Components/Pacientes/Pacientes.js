import React, { Component } from "react";

// Import Dependencias
import Table from "../Layouts/Table/Table";
import "./Pacientes.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserPreview from "../Layouts/UserPreview/UserPreview";
import Avatar from "react-avatar";
import CrudPatients from "../../Utils/CrudPatients";
import Alert from "react-s-alert";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import AddBox from "@material-ui/icons/AddBox";

// Import Componentes
import AddPatientModal from "./Modals/AddPatientModal";

// Import Redux
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    client: state.client.client,
  };
};

class Pacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onFocusName: false,
      onFocusSurname: false,
      onFocusDni: false,
      rowSelected: false,
      showModal: false,

      userData: {},
      patients: [],

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
        {
          title: "Apellido",
          field: "surname",
          editComponent: (props) => (
            <input
              type="text"
              required={true}
              style={
                !this.state.onFocusSurname
                  ? this.state.inputStyle
                  : this.state.inputFocusStyle
              }
              onFocus={() => this.onFocus("Surname")}
              onBlur={() => this.onBlur("Surname")}
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
            />
          ),
        },
        {
          title: "D.N.I",
          field: "dni",
          type: "numeric",
          cellStyle: {
            textAlign: "center",
          },
          editComponent: (props) => (
            <input
              type="text"
              required={true}
              style={
                !this.state.onFocusDni
                  ? this.state.inputStyle
                  : this.state.inputFocusStyle
              }
              onFocus={() => this.onFocus("Dni")}
              onBlur={() => this.onBlur("Dni")}
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
            />
          ),
        },
        {
          title: "Tratamientos activos",
          field: "treatment",
          type: "numeric",
          editable: "never",
          cellStyle: {
            textAlign: "center",
          },
        },
      ],
    };
  }

  componentDidMount() {
    if (this.props.client.host && this.props.user.auth_token) {
      CrudPatients.listPatients(
        this.props.user.auth_token,
        this.props.client.host
      ).then((result) => {
        if (result.success) {
          this.setState({
            patients: result.result,
          });
        } else {
          console.log(result)
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

  onFocus = (field) => {
    var focusField = "onFocus" + field;
    this.setState({ [focusField]: true });
  };

  onBlur = (field) => {
    var focusField = "onFocus" + field;
    this.setState({ [focusField]: false });
  };

  userOptions = (userData) => {
    this.setState({ userData: userData, rowSelected: true });
  };

  handleModal(value) {
    this.setState({ showModal: value });
  }

  //FUNCIONES CRUD

  handleDeleteRow = (idPaciente, indexTable) => {
    CrudPatients.deletePacient(
      this.props.user.auth_token,
      this.props.client.host,
      idPaciente
    )
      .then((result) => {
        if (result.success) {
          let data = this.state.patients;
          data.splice(indexTable, 1);
          this.setState({ data });
          Alert.success("Paciente eliminado correctamente", {
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
  };

  handleAddRow = (newPatient) => {
    var list = this.state.patients.concat(newPatient);
    this.setState({ patients: list });
  };

  handleEditRow = (editedIndex, data, newData) => {
    let patientData = newData;

    CrudPatients.editPatient(
      this.props.user.auth_token,
      this.props.client.host,
      patientData
    )
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
  };

  render() {
    return (
      <Row md={12}>
        <Col md={9} className="table_container">
          <Table
            data={this.state.patients}
            tableName="Pacientes"
            columns={this.state.tableColumns}
            userOptions={this.userOptions.bind(this)}
            handleDeleteRow={this.handleDeleteRow.bind(this)}
            handleEditRow={this.handleEditRow.bind(this)}
          />
        </Col>
        <Fab
          icon={<AddBox />}
          mainButtonStyles={{
            backgroundColor: this.props.client.main_color,
            position: "relative",
            top: 0,
          }}
          onClick={() => this.handleModal(true)}
        >
          <Action
            style={{
              width: 130,
              height: 30,
              borderRadius: 0,
              borderBottomLeftRadius: 30,
              borderTopLeftRadius: 30,
              backgroundColor: this.props.client.main_color,
              position: "relative",
              top: 72,
              right: 60,
            }}
            onClick={() => this.handleModal(true)}
          >
            <span>Nuevo Paciente</span>
          </Action>
        </Fab>

        {/* USER PREVIEW */}

        {this.state.rowSelected ? (
          <Col md={3} className="user_preview_container">
            <UserPreview
              userData={this.state.userData}
              client={this.props.client}
              handleDeleteRow={this.handleDeleteRow.bind(this)}
              url={this.props.url}
              renderView={{
                userinfo: "infoPaciente",
                insurance: "obrasPaciente",
                treatments: "tratamientos",
              }}
            />
          </Col>
        ) : null}

        {/* MODAL ADD */}

        {!this.state.showModal ? null : (
          <AddPatientModal
            showModal={this.state.showModal}
            title="Nuevo Paciente"
            client={this.props.client}
            auth_token={this.props.user.auth_token}
            handleAddRow={this.handleAddRow.bind(this)}
            handleModal={this.handleModal.bind(this)}
          />
        )}
      </Row>
    );
  }
}

export default connect(mapStateToProps)(Pacientes);
