// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from './HandleCrudErrors';

const GeneralSpecialitiesCrud = {

    getGeneralSpecialities(auth_token, client_host){
        return axios.get(`${Config.api_url}/general-specialties`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
                client_host : client_host
            }
        }).then(json => {
            if(json.data.success){
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            }else{
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })
        .catch(error => { return handleCrudErrors(error)});
    },

    add(data, auth_token, client_host){
        return axios.post(`${Config.api_url}/general-specialties/add`, data, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
                client_host : client_host, 
            },
           
        }).then((json=>{
            if (json.data.success) {
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            } else {
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })).catch(error => { return handleCrudErrors(error)});
    }, 

    delete(id, auth_token, client_host){
        return axios.delete(`${Config.api_url}/general-specialties/${id}`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
                client_host : client_host
            }
        }).then(json => {
            if(json.data.success){
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            }else{
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })
        .catch(error => { return handleCrudErrors(error)});
    },

    edit(data, auth_token, client_host){
        return axios.post(`${Config.api_url}/general-specialties/edit`, data, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
                client_host : client_host, 
            },
           
        }).then((json=>{
            if (json.data.success) {
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            } else {
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })).catch(error => { return handleCrudErrors(error)});
    }

}

export default GeneralSpecialitiesCrud;