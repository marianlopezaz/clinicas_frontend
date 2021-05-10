import axios from "axios";
import Config from './config';
import handleCrudErrors from './HandleCrudErrors';

const CrudPatients = {

    deletePacient(auth_token, client_host, idPacient){

        return axios.delete(`${Config.api_url}/patients/${idPacient}`, {
            headers : {
                'Authorization' : `Bearer ${auth_token}`, 
                'client_host' : client_host,
                'Content-Type': 'application/json',
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

    addNewPatient(auth_token,client_host,patientData){
        const headers = {
            Authorization : `Bearer ${auth_token}`, 
            client_host : client_host
          }
        return axios
          .post(`${Config.api_url}/patients/add`, patientData, {
            headers: headers,
          })
          .then((json) => {
            if (json.data.success) {
              let response = {
                success: true,
                result: json.data.data,
              };
              console.log(response);
              return response;
            } else {
              let response = {
                success: false,
                result: json.data.data,
              };
              //console.log(response);
              return response;
            }
          })
          .catch((error) => {
            return handleCrudErrors(error);
          });
    },
    editPatient(auth_token, client_host, patientData){
        const headers = {
            Authorization : `Bearer ${auth_token}`, 
            client_host : client_host
          }

       return axios
         .post(`${Config.api_url}/patients/edit`, patientData, {
           headers: headers,
         })
         .then((json) => {
           if (json.data.success) {
             let response = {
               success: true,
               result: json.data.data,
             };
             console.log(response);
             return response;
           } else {
             let response = {
               success: false,
               result: json.data.data,
             };
             //console.log(response);
             return response;
           }
         })
         .catch((error) => {
           return handleCrudErrors(error);
         });

    },




    listPatients(auth_token,client_host){
        return axios
          .get(`${Config.api_url}/patients/list`, {
            headers: {
              Authorization: `Bearer ${auth_token}`,
              client_host: client_host,
            },
          })
          .then((json) => {
            var result = {};
            if (json.data.success) {
              result = {
                success: true,
                result: json.data.data,
              };
              return result;
            } else {
              result = {
                success: false,
                result: json.data.data,
              };
              return result;
            }
          })
          .catch((error) => {
            return handleCrudErrors(error);
          });
        },


}

export default CrudPatients;