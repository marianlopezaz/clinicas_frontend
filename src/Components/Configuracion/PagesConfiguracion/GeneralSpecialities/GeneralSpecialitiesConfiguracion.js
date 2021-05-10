import React, { Component } from "react";

// Import dependencias
import Alert from "react-s-alert";
import Table from "../../../Layouts/Table/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Import Componentes
import GeneralSpecialitiesCrud from "../../../../Utils/GralSpecialitiesCrud";
import ModalAddGeneralSpeciality from "./Modales/ModalAddGeneralSpeciality";

class GeneralSpecialitiesConfiguracion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gral_specialities: [],
      tableColumns: [
        { title: "Nombre", field: "name", cellStyle: { textAlign: "left" } },
      ],
    };
  }

  componentDidMount() {
    if (this.props.client.host && this.props.user.auth_token) {
      GeneralSpecialitiesCrud.getGeneralSpecialities(
        this.props.user.auth_token,
        this.props.client.host
      ).then((result) => {
        if (result.success) {
          this.setState({
            gral_specialities: result.result,
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

  handleSubmitModalAdd(data) {
    GeneralSpecialitiesCrud.add(
      data,
      this.props.user.auth_token,
      this.props.client.host
    ).then((result) => {
      if (result.success) {
        this.setState({
          gral_specialities: this.state.gral_specialities.concat(result.result),
        });
        Alert.success(
          `Especiliadad general: ${result.result.name} agregada correctamente!`,
          {
            position: "bottom-left",
            effect: "genie",
          }
        );
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

  handleDeleteRow(id, indexTable) {
    GeneralSpecialitiesCrud.delete(
      id,
      this.props.user.auth_token,
      this.props.client.host
    ).then((result) => {
      if (result.success) {
        let data = this.state.gral_specialities;
        data.splice(indexTable, 1);
        this.setState({ gral_specialities: data });
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
    let data_send = {
      id: newData.id,
      name: newData.name,
    };
    GeneralSpecialitiesCrud.edit(
      data_send,
      this.props.user.auth_token,
      this.props.client.host
    )
      .then((result) => {
        if (result.success) {
          data[editedIndex] = newData;
          this.setState({ gral_specialities: data });
          Alert.success("Especialidad general editada correctamente", {
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

  render() {
    return (
      <div>
        <Row md={12}>
          <ModalAddGeneralSpeciality
            handleSubmitModalAdd={this.handleSubmitModalAdd.bind(this)}
            main_color={this.props.client.main_color}
          />
          <Col md={11} style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Table
              handleDeleteRow={this.handleDeleteRow.bind(this)}
              handleEditRow={this.handleEditRow.bind(this)}
              tableName="Especialidades Generales"
              data={this.state.gral_specialities}
              columns={this.state.tableColumns}
            ></Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GeneralSpecialitiesConfiguracion;
