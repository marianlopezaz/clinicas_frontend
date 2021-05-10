import axios from "axios";
import Config from "./config";
import handleCrudErrors from "./HandleCrudErrors";

const PatientServices = {
  listPatientHealthInsurance(auth_token, client_host, patient_id) {
    return axios
      .get(`${Config.api_url}/patients/list-patients-health-insurance/`, {
        params: { patient_id: `${patient_id}` },
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
      .catch(error => { return handleCrudErrors(error)});
  },

  addHealthInsuranceToPatient(
    auth_token,
    client_host,
    id_patient_health_insurance
  ) {
    const headers = {
      Authorization: `Bearer ${auth_token}`,
      client_host: client_host,
    };

    return axios
      .post(
        `${Config.api_url}/patients/add-patients-health-insurance`,
        id_patient_health_insurance,
        {
          headers: headers,
        }
      )
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
      .catch(error => { return handleCrudErrors(error)});
  },
  deletePatientHealthInsurance(
    auth_token,
    client_host,
    patientsHealthInsuranceId
  ) {
    return axios
      .delete(
        `${Config.api_url}/patients/delete-patients-health-insurance/${patientsHealthInsuranceId}`,
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            client_host: client_host,
            "Content-Type": "application/json",
          },
        }
      )
      .then((json) => {
        if (json.data.success) {
          let response = {
            success: true,
            result: json.data.data,
          };
          return response;
        } else {
          let response = {
            success: false,
            result: json.data.data,
          };
          return response;
        }
      })
      .catch(error => { return handleCrudErrors(error)});
  },
};

export default PatientServices;
