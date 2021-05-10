// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from './HandleCrudErrors';

const CrudHealthInsurance = {

    list(auth_token, client_host){
        return axios.get(`${Config.api_url}/health-insurance/list`, {
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

    delete(health_insurance_id, auth_token, client_host){
        return axios.delete(`${Config.api_url}/health-insurance/${health_insurance_id}`, {
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

    add(healthInsurance, auth_token, client_host){
        return axios.post(`${Config.api_url}/health-insurance/add`, healthInsurance, {
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

    edit(healthInsurance, auth_token, client_host){
        return axios.post(`${Config.api_url}/health-insurance/edit`, healthInsurance, {
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

export default CrudHealthInsurance;