// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from './HandleCrudErrors';

const CrudUsers = {

    getCurrentUser(auth_token, client_host){
        return axios.get(`${Config.api_url}/user`, {
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

    getUsers(auth_token, client_host){

        return axios.get(`${Config.api_url}/user/list`, {
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

    delete(user_id, auth_token, client_host){
        return axios.delete(`${Config.api_url}/user/${user_id}`, {
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

    edit(dataUser, auth_token, client_host){
        return axios.post(`${Config.api_url}/user/edit`, dataUser, {
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

    add(dataUser, auth_token, client_host){
        return axios.post(`${Config.api_url}/user/add`, dataUser, {
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

export default CrudUsers;