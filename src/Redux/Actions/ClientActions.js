// Import Componentes
import Client from "../../Utils/ClientRequests";

// Import Dependencias
import Alert from "react-s-alert";

export const setClient = (client_host) => (dispatch) => {
  return Client.getClient(client_host).then((result) => {
    if (result.success) {
      let client = {
        name: result.result.name,
        logo_url: result.result.logo_url,
        main_color: result.result.color,
        host: result.result.url,
        localStorage: true,
      };
      localStorage["client"] = JSON.stringify(client);
      dispatch({ type: "setClient", payload: client });
    } else {
      Alert.error(result.result, {
        position: "bottom-left",
        effect: "genie",
      });
    }
  });
};

