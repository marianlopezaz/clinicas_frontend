// Import Componentes
import Auth from "../../Utils/Auth";

// Import Dependencias
import Alert from "react-s-alert";

export const login = (username, password, client_host) => (dispatch) => {
  dispatch({ type: "loadingUser" });
  return Auth.login(username, password, client_host).then((result) => {
    if (result.isLoggedIn) {
      let user = {
        isLoggedIn: result.isLoggedIn,
        isLoading: false,
        user: result.user,
      };
      localStorage["user"] = JSON.stringify(user);
      dispatch({ type: "login", payload: result.user });
    } else {
      Alert.error(result.result, {
        position: "bottom-left",
        effect: "genie",
      });
    }
  });
};

export const logout = (auth_token, client_host) => (dispatch) => {
  return Auth.logout(auth_token, client_host).then((result) => {
    if (result.success) {
      let user = {
        isLoggedIn: false,
        isLoading: false,
        user: {},
      };
      // Se guarda la data en el localStorage
      localStorage["user"] = JSON.stringify(user);
      dispatch({ type: "logout" });
      return true;
    } else {
      Alert.error(result.data, {
        position: "bottom-left",
        effect: "genie",
      });
      return false;
    }
  });
};
