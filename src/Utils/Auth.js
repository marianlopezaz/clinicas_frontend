// Axios
import axios from "axios";
import Config from './config';

const Auth = {

    login(user, password, client_host){

        var formData = new FormData();
        formData.append("user_name", user);
        formData.append("password", password);

        return axios.post(`${Config.api_url}/user/login/`, formData, {
            headers : {
                client_host : client_host
            }
        }).then(json => {
            if (json.data.success) {
                const { name, surname, id, user_name, role, auth_token, expire_time } = json.data.data;
                let userData = {
                    name,
                    surname,
                    id,
                    user_name,
                    auth_token,
                    role,
                    expire_time,
                    timestamp: new Date().toString()
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                return appState;
            } else {
                return `${json.data.data}. Intenta nuevamente!`;
            };
        })
        .catch(error => {
            return error.message;
        });
    },

    logout(auth_token, client_host){
        return axios.get(`${Config.api_url}/user/logout/`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
                client_host : client_host
            }
        }).then(json => {
            if (json.data.success) {
                return {success: true, data: json.data.data};
            } else {
                return {success: false, data: `${json.data.data}. Intenta nuevamente!`};
            };
        })
        .catch(error => {
            return {success: false, data: error.message};
        });
    }
}

export default Auth;