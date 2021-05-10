import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Import Componentes
import PatientInfo from "./PatientPages/PatientInfo/PatientInfo";
import PatientInsurance from "./PatientPages/PatientInsurance/PatientInsurance";
import PatientTreatments from "./PatientPages/PatientTreatments/PatientTreatments";
import SubHeader from "../Layouts/SubHeader/SubHeader";
import "./Paciente.css";

// Import Dependencias
import ClipLoader from "react-spinners/ClipLoader";

// Import Redux
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        user: state.user.user,
        client: state.client.client
    }
}

class Paciente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientData: JSON.parse(sessionStorage.getItem("patientData")),
      renderView: this.props.match.params.renderView,
      loading: true,
    };
  }

  componentDidMount() {
    if (this.state.patientData.id !== null) {
      let requestedId = this.props.match.params.patientId;

      if (requestedId !== String(this.state.patientData.id)) {
        window.history.back();
      } else {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    let baseUrl = this.props.match.url.slice(0, 20);
    baseUrl = `${baseUrl}/${this.state.patientData.id}/`;

    const dataSidebar = [
      {
        component: "infoPaciente",
        main_color: this.props.client.main_color,
        url: baseUrl + "infoPaciente",
      },
      {
        component: "obrasPaciente",
        main_color: this.props.client.main_color,
        url: baseUrl + "obrasPaciente",
      },
      {
        component: "tratamientos",
        main_color: this.props.client.main_color,
        url: baseUrl + "tratamientos",
      },
    ];

    if (this.state.loading) {
      return (
        <div>
          <ClipLoader
            css={[
              { display: "block" },
              { margin: "0 auto" },
              { marginTop: "150px" },
              { borderColor: "grey" },
            ]}
            size={35}
            loading={this.state.loading}
          />
        </div>
      );
    }
    return (
      <div>
        <SubHeader dataSidebar={dataSidebar} />

        {this.state.renderView === "infoPaciente" ? (
          <PatientInfo
            patientData={this.state.patientData}
            client={this.props.client}
            user={this.props.user}
          />
        ) : this.state.renderView === "obrasPaciente" ? (
          <PatientInsurance
            client={this.props.client}
            user={this.props.user}
            patientData={this.state.patientData}
          />
        ) : (
          <PatientTreatments
            client={this.props.client}
            user={this.props.user}
            patient_id={this.state.patientData.id}
          />
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Paciente));
