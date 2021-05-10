import React, { Component } from "react";

// Import Dependencias
import { Row, Col } from "react-bootstrap";
import Alert from "react-s-alert";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";

// Import Components y Archivos
import "./HealthInsuranceConfiguracion.css";
import CrudHealthInsurances from "../../../../Utils/CrudHealthInsurances";
import "../../../Layouts/ConfirmationModals/DeleteModal.css";
import ModalAddHealthInsurance from "./Modales/ModalAddHealthInsurance";

class HealthInsuranceConfiguracion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healthInsurances: [],
      is_delete_modal_open: false,
      health_insurance_delete_id: 0,
      loading_delete: false,
      is_edit_modal_open: false,
      editable_health_insurance_id: 0,
      editable_health_insurance_name: "",
      editable_health_insurance_status: "",
    };
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmitModalAdd = this.handleSubmitModalAdd.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleChangeEdit = this.handleChangeEdit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  componentDidMount() {
    if (this.props.client.host && this.props.user.auth_token) {
      CrudHealthInsurances.list(
        this.props.user.auth_token,
        this.props.client.host
      ).then((result) => {
        if (result.success) {
          this.setState({ healthInsurances: result.result });
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

  handleDelete() {
    this.setState({ loading_delete: true });
    CrudHealthInsurances.delete(
      this.state.health_insurance_delete_id,
      this.props.user.auth_token,
      this.props.client.host
    ).then((result) => {
      if (result.success) {
        if (
          this.state.healthInsurances.find((healthInsurance) => {
            return healthInsurance.id === this.state.health_insurance_delete_id;
          })
        ) {
          let healthInsurances = this.state.healthInsurances;
          let removeHealthInsurance = healthInsurances
            .map((healthInsurance) => {
              return healthInsurance.id;
            })
            .indexOf(this.state.health_insurance_delete_id);
          healthInsurances.splice(removeHealthInsurance, 1);
          this.setState({
            loading_delete: false,
            is_delete_modal_open: false,
            healthInsurances: healthInsurances,
          });
        }
        Alert.success(result.result, {
          position: "bottom-left",
          effect: "genie",
        });
      } else {
        this.setState({ loading_delete: false, is_delete_modal_open: false });
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom-left",
            effect: "genie",
          });
        });
      }
    });
  }

  handleDeleteClick(health_insurance_delete_id) {
    this.setState({
      is_delete_modal_open: true,
      health_insurance_delete_id: health_insurance_delete_id,
    });
  }

  handleEditClick(health_insurance_edit_id) {
    let editable_health_insurance = this.state.healthInsurances.find(
      (healthInsurance) => {
        return healthInsurance.id === health_insurance_edit_id;
      }
    );
    this.setState({
      is_edit_modal_open: true,
      editable_health_insurance_id: editable_health_insurance.id,
      editable_health_insurance_name: editable_health_insurance.name,
      editable_health_insurance_status: editable_health_insurance.status,
    });
  }

  handleCloseDelete() {
    this.setState({ is_delete_modal_open: false });
  }

  handleCloseEdit() {
    this.setState({
      is_edit_modal_open: false,
      editable_health_insurance_id: 0,
      editable_health_insurance_name: "",
      editable_health_insurance_status: "",
    });
  }

  handleSubmitModalAdd(newHealthInsurance) {
    CrudHealthInsurances.add(
      newHealthInsurance,
      this.props.user.auth_token,
      this.props.client.host
    ).then((result) => {
      if (result.success) {
        if (
          !this.state.healthInsurances.find((healthInsurance) => {
            return healthInsurance.id === result.result.id;
          })
        ) {
          let healthInsurances = this.state.healthInsurances;
          healthInsurances.push({
            id: result.result.id,
            name: result.result.name,
            status: result.result.status,
          });
          this.setState({ healthInsurances: healthInsurances });
        }
        Alert.success(
          `Obra Social ${result.result.name} creada correctamente.`,
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

  handleChangeEdit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmitEdit() {
    this.setState({ loading_delete: true });
    let editable_health_insurance = {
      id: this.state.editable_health_insurance_id,
      name: this.state.editable_health_insurance_name,
      status: this.state.editable_health_insurance_status,
    };
    CrudHealthInsurances.edit(
      editable_health_insurance,
      this.props.user.auth_token,
      this.props.client.host
    ).then((result) => {
      if (result.success) {
        if (
          this.state.healthInsurances.find((healthInsurance) => {
            return healthInsurance.id === result.result.id;
          })
        ) {
          let healthInsurances = this.state.healthInsurances.map(
            (healthInsurance) => {
              if (healthInsurance.id === result.result.id) {
                healthInsurance.name = result.result.name;
                healthInsurance.status = result.result.status;
              }
              return healthInsurance;
            }
          );
          this.setState({
            loading_delete: false,
            is_edit_modal_open: false,
            healthInsurances: healthInsurances,
          });
        }
        Alert.success(
          `Obra Social ${result.result.name} editada correctamente.`,
          {
            position: "bottom-left",
            effect: "genie",
          }
        );
      } else {
        this.setState({ loading_delete: false, is_edit_modal_open: false });
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
        {/* Modale Delete */}
        <Dialog
          open={this.state.is_delete_modal_open}
          onClose={this.handleCloseDelete}
        >
          <DialogTitle id="alert-dialog-slide-title">
            ¿Seguro que deseas eliminar esta Obra Social?
          </DialogTitle>
          {!this.state.loading_delete ? (
            <DialogActions>
              <Button onClick={this.handleCloseDelete} color="primary">
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
        {/* Modal Edit */}
        <Dialog
          open={this.state.is_edit_modal_open}
          onClose={this.handleCloseEdit}
        >
          <DialogTitle id="alert-dialog-slide-title">
            Editar Obra Social
          </DialogTitle>
          {!this.state.loading_delete ? (
            <form
              id="edit_health_insurance_form"
              action=""
              onSubmit={this.handleSubmitEdit}
              method="post"
            >
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="editable_health_insurance_name"
                  label="Nombre"
                  type="text"
                  fullWidth
                  value={this.state.editable_health_insurance_name}
                  onChange={this.handleChangeEdit}
                />
                <TextField
                  id="standard-select-currency-native"
                  select
                  fullWidth
                  margin="dense"
                  label="Seleccionar Estado"
                  name="editable_health_insurance_status"
                  value={this.state.editable_health_insurance_status}
                  onChange={this.handleChangeEdit}
                >
                  <MenuItem key="activo" value="activo">
                    Activo
                  </MenuItem>
                  <MenuItem key="inactivo" value="inactivo">
                    No Activo
                  </MenuItem>
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseEdit} color="primary">
                  Cancelar
                </Button>
                <Button onClick={this.handleSubmitEdit} color="primary">
                  Guardar
                </Button>
              </DialogActions>
            </form>
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
        <Row md={12} className="center">
          <Col md={12}>
            {this.state.healthInsurances &&
            this.state.healthInsurances.length > 0 ? (
              this.state.healthInsurances.map((healthInsurance, index) => {
                return (
                  <div
                    key={index}
                    className="health_insurance_container_configuracion center"
                  >
                    <Row md={12}>
                      <Col md={6}>
                        <Row md={12}>
                          <Col md={12}>
                            <p className="card_name">Nombre</p>
                          </Col>
                          <Col md={12}>
                            <p className="card_atr">{healthInsurance.name}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row md={12}>
                          <Col md={12}>
                            <p className="card_name">Estado</p>
                          </Col>
                          <Col md={12}>
                            {healthInsurance.status === "activo" ? (
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
                          onClick={this.handleEditClick.bind(
                            this,
                            healthInsurance.id
                          )}
                          title="Editar Obra Social"
                          className="health_insurance_icons"
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          onClick={this.handleDeleteClick.bind(
                            this,
                            healthInsurance.id
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
              })
            ) : (
              <Row
                md={12}
                style={{
                  color: "grey",
                  margin: "auto",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                <Col md={12}>
                  No se encontraron Obras Sociales creadas, agrega una!
                </Col>
              </Row>
            )}
            <ModalAddHealthInsurance
              handleSubmitModalAdd={this.handleSubmitModalAdd}
              main_color={this.props.client.main_color}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HealthInsuranceConfiguracion;
