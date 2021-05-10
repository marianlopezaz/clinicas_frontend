import React from "react";
import "./Login.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LogoLoader from "./LogoLoader";

const Login = (props) => {
  let _user, _password;
  const loginUser = props.loginUser;
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(_user.value, _password.value);
  };
  return (
    <Container fluid>
      <Row>
        <Col className="center">
          {props.client.logo_url ? (
            <img
              id="logo_cliente_login"
              src={props.client.logo_url}
              alt="Logo"
            />
          ) : (
            <LogoLoader />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Col className="center" id="datafields_container">
            <Row className="center">
              <Col>
                <p id="p_iniciar_sesion">Iniciar Sesión</p>
              </Col>
            </Row>

            <form
              id="login-form"
              action=""
              onSubmit={handleLogin}
              method="post"
            >
              <Row className="center">
                <Col>
                  <input
                    title="Usuario"
                    className="form-control"
                    placeholder="Usuario"
                    ref={(input) => (_user = input)}
                    id="user-input"
                    name="user"
                  />
                </Col>
              </Row>
              <Row className="center">
                <Col>
                  <input
                    title="Contraseña"
                    className="form-control"
                    placeholder="Contraseña"
                    ref={(input) => (_password = input)}
                    id="password-input"
                    name="password"
                    type="password"
                  />
                </Col>
              </Row>
              <Row className="center">
                <Col id="ingresar_btn">
                  {props.isUserLoading ? (
                    <button
                      title="Iniciar Sesión"
                      style={{
                        backgroundColor: props.client.main_color,
                        opacity: "0.7",
                        cursor: "default",
                      }}
                      type="submit"
                      className="landing-page-btn center-block text-center"
                      disabled
                      id="user-login-btn"
                    >
                      <i className="fas fa-circle-notch fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      title="Iniciar Sesión"
                      style={{ backgroundColor: props.client.main_color }}
                      type="submit"
                      className="landing-page-btn center-block text-center"
                      id="user-login-btn"
                    >
                      <i style={{fontStyle: 'normal'}}>INGRESAR</i>
                    </button>
                  )}
                </Col>
              </Row>
            </form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
