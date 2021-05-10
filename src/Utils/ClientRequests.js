// Axios
import axios from "axios";
import Config from './config';

const Client = {
    getClient(client_host){
        return axios.get(`${Config.api_url}/client/get-client`, { 
          headers: {
            client_host : client_host
          } 
        }).then(json => {
          var result = {};
          if (json.data.success) {
              result = {
                success: true,
                result: json.data.data
              }
              return result;
          } else {
            result = {
              success: false,
              result: json.data.data
            }
            return result;
          };
        })
        .catch(error => {
          let requestError = {
            success: false,
            result: 'Error de conexión'
          }
          return requestError;
        });
    }
};

export default Client;