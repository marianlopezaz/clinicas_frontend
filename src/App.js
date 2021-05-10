// Imports uso en el App
import React from "react";

// Imports dependencias
import { Switch, Route } from "react-router-dom";
import $ from "jquery";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css?v=2";
import "react-s-alert/dist/s-alert-css-effects/genie.css";

// Imports Componentes
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NotFound404 from "../src/Pages/Errors/404/NotFound404";

// Import Redux
import { connect } from "react-redux";
import { login, logout } from "./Redux/Actions/UserActions";
import { setClient } from "./Redux/Actions/ClientActions";

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isLoading: state.user.isLoading,
    user: state.user.user,
    client: state.client.client,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password, client_host) =>
    dispatch(login(username, password, client_host)),
  logout: (auth_token, client_host) =>
    dispatch(logout(auth_token, client_host)),
  setClient: (client_host) => dispatch(setClient(client_host))
});

class App extends React.Component {

  componentDidMount() {
    if (this.props.location.pathname !== "/login") {
      document.title = this.props.client.name;
      $(":root").css({ "--main_color": this.props.client.main_color });
    } else {
      this.props.setClient(window.location.host);
      document.title = this.props.client.name;
      $("#clinica_favicon").attr("href", this.props.client.favicon_url);
      $(":root").css({ "--main_color": this.props.client.main_color });
    }
  }

  _loginUser = (user, password) => {
    this.props.login(user, password, this.props.client.host);
  };

  _logoutUser = () => {
    if (this.props.logout(this.props.user.auth_token, this.props.client.host)) {
      this.props.history.push("/login");
      Alert.success("Sesión cerrada correctamente", {
        position: "bottom-left",
        effect: "genie",
      });
    }
  };

  render() {
    if (
      !this.props.isLoggedIn &&
      (this.props.location.pathname !== "/login" ||
        this.props.location.pathname === "/")
    ) {
      this.props.history.push("/login");
    }
    if (
      this.props.isLoggedIn &&
      (this.props.location.pathname === "/login" ||
        this.props.location.pathname === "/" ||
        this.props.location.pathname === "/dashboard")
    ) {
      this.props.history.push("/dashboard/pacientes");
    }
    return (
      <div>
        <Alert timeout={5000} stack={true} />
        <Switch data="data">
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard
                {...props}
                logoutUser={this._logoutUser}
                location={this.props.location}
              />
            )}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                loginUser={this._loginUser}
                client={this.props.client}
                isUserLoading={this.props.isLoading}
              />
            )}
          />
          {/* Redirect 404 Error */}
          <Route component={NotFound404} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
