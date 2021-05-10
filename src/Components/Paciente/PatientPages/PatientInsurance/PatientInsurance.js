import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import PatientServices from "../../../../Utils/PatientServices";
import Alert from "react-s-alert";
import ModalAddPatientInsurance from "./ModalAddPatientInsurance";
import "./PatientInsurance.css";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

class PatientInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      health_insurance: [],
      patientData: this.props.patientData,
      showAddModal: false,
      delete_modal_patient_insurance_open: false,
      health_insurance_delete_id: null,
      loading_delete: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.client.host && this.props.user.auth_token) {
      PatientServices.listPatientHealthInsurance(
        this.props.user.auth_token,
        this.props.client.host,
        this.state.patientData.id
      )
        .then((result) => {
          if (result.success) {
            this.setState({ health_insurance: result.result });
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
  }
  handleDeleteClick(health_insurance_delete_id) {
    this.setState({
      delete_modal_patient_insurance_open: true,
      health_insurance_delete_id: health_insurance_delete_id,
    });
  }

  handleClose() {
    this.setState({ delete_modal_patient_insurance_open: false });
  }

  handleDelete() {
    console.log(this.state.health_insurance_delete_id);
    this.setState({ loading_delete: true });
    PatientServices.deletePatientHealthInsurance(
      this.props.user.auth_token,
      this.props.client.host,
      this.state.health_insurance_delete_id
    ).then((result) => {
      if (result.success) {
        if (
          this.state.health_insurance.find((healthInsurance) => {
            return (
              healthInsurance.patients_health_insurances_id ===
              this.state.health_insurance_delete_id
            );
          })
        ) {
          let healthInsurances = this.state.health_insurance;
          let removeHealthInsurance = healthInsurances
            .map((healthInsurance) => {
              return healthInsurance.patients_health_insurances_id; //porque ?
            })
            .indexOf(this.state.health_insurance_delete_id);
          healthInsurances.splice(removeHealthInsurance);
          this.setState({
            loading_delete: false,
            delete_modal_patient_insurance_open: false,
            health_insurance: healthInsurances,
          });
        }
        Alert.success(result.result, {
          position: "bottom-left",
          effect: "genie",
        });
      } else {
        this.setState({
          loading_delete: false,
          delete_modal_patient_insurance_open: false,
        });
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom-left",
            effect: "genie",
          });
        });
      }
    });
  }

  handleSubmitModalAddHealthInsurance(health_insurance_id) {
    let ids = {
      health_insurance_id: health_insurance_id,
      patient_id: this.state.patientData.id,
    };
    PatientServices.addHealthInsuranceToPatient(
      this.props.user.auth_token,
      this.props.client.host,
      ids
    )
      .then((result) => {
        if (result.success) {
          let new_health_insurances = this.state.health_insurance.concat(
            result.result
          );

          this.setState({ health_insurance: new_health_insurances });
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
        /*  */
      });
  }

  render() {
    return (
      <div>
        {/* Modale Delete */}
        <Dialog
          open={this.state.delete_modal_patient_insurance_open}
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-slide-title">
            ¿Seguro que deseas eliminar esta Obra Social?
          </DialogTitle>
          {!this.state.loading_delete ? (
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.handleDelete} color="primary">
                Eliminar
              </Button>
            </DialogActions>
          ) : (
            <ClipLoader
              css={[
                { display: "flex" },
                { margin: "0 auto" },
                { marginBottom: 25 },
                { borderColor: this.props.client.main_color },
              ]}
              size={35}
              loading={this.state.loading_delete}
            />
          )}
        </Dialog>
        {/* Vista */}
        <Row>
          <Col>
            {this.state.health_insurance.length > 0 ? (
              this.state.health_insurance.map(
                (patient_health_insurance, index) => {
                  return (
                    <div
                      key={index}
                      className="patient_health_insurance_container center"
                    >
                      <Row md={12}>
                        <Col md={6}>
                          <Row md={12}>
                            <Col md={12}>
                              <p className="card_name">Nombre</p>
                            </Col>
                            <Col md={12}>
                              <p className="card_atr">
                                {patient_health_insurance.name}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row md={12}>
                            <Col md={12}>
                              <p className="card_name">Estado</p>
                            </Col>
                            <Col md={12}>
                              {patient_health_insurance.status === "activo" ? (
                                <p className="card_atr">Activo</p>
                              ) : (
                                <p className="card_atr">No Activo</p>
                              )}
                            </Col>
                          </Row>
                        </Col>
                        <Col md={12} className="center">
                          <IconButton
                            color="inherit"
                            onClick={this.handleDeleteClick.bind(
                              this,
                              patient_health_insurance.patients_health_insurances_id
                            )}
                            title="Eliminar Obra Social"
                            className="health_insurance_icons"
                          >
                            <ClearOutlinedIcon />
                          </IconButton>
                        </Col>
                      </Row>
                    </div>
                  );
                }
              )
            ) : (
              <Row
                style={{
                  color: "grey",
                  margin: "auto",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                <Col>
                  No se encontraron Obras Sociales de{" "}
                  {this.props.patientData.name}, agrega una!
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "rigth" }}>
            <ModalAddPatientInsurance
              main_color={this.props.client.main_color}
              handleSubmitModalAddHI={this.handleSubmitModalAddHealthInsurance.bind(
                this
              )}
              auth_token={this.props.user.auth_token}
              client_host={this.props.client.host}
              patient_id={this.props.patientData.id}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PatientInsurance;
