import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Import Componentes
import SubHeader from "../Layouts/SubHeader/SubHeader";
import HealthInsurance from "./PagesConfiguracion/HealthInsurance/HealthInsuranceConfiguracion";
import GeneralSpecialities from "./PagesConfiguracion/GeneralSpecialities/GeneralSpecialitiesConfiguracion";

// Import Redux
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    client: state.client.client,
  };
};

class Configuracion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderView: this.props.match.params.renderView,
    };
  }

  render() {
    let baseUrl = this.props.match.url.slice(0, 24);
    baseUrl = `${baseUrl}/`;

    const dataSidebar = [
      {
        component: "configuracionObras",
        main_color: this.props.client.main_color,
        url: baseUrl + "configuracionObras",
      },
      {
        component: "configuracionEspecialidadesGenerales",
        main_color: this.props.client.main_color,
        url: baseUrl + "configuracionEspecialidadesGenerales",
      },
    ];

    return (
      <div>
        <SubHeader dataSidebar={dataSidebar} />
        {this.state.renderView === "configuracionObras" ? (
          <HealthInsurance client={this.props.client} user={this.props.user} />
        ) : this.state.renderView === "configuracionEspecialidadesGenerales" ? (
          <GeneralSpecialities client={this.props.client} user={this.props.user} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Configuracion));
