import { AsyncStorage } from 'react-native'
import axios from 'axios';


export class Addpatient {
    static ADDDATA = 'ADDDATA';
    static FETCHDATA = 'FETCHDATA';
    static REMOVE_PATIENT = 'REMOVE_PATIENT';
    static REMOVE_ALL_PATIENTS = 'REMOVE_ALL_PATIENTS';


    static addData(payload) {
        console.log("result wala ho ja bhai ktna tang kare ga")
        return {
            type: Addpatient.ADDDATA,
            payload
        }


    }

    static addStorage(userObj) {
        return (dispatch) => {
            return axios.post('https://patientnode.herokuapp.com/CREATEPATIENT', userObj)
                .then((data) => {
                    console.log(data)
                    dispatch(Addpatient.addData(userObj))
                })
                .catch((err) => console.log(err));
        }
    }

    static fetchData(fetchData) {
        return {
            type: Addpatient.FETCHDATA,
            payload: (fetchData || [])
        }
    }
    static fetchStorage() {
        return (dispatch) => {
            return axios.get('https://patientnode.herokuapp.com/CREATEPATIENT')
                .then((data) => {
                    console.log(data)
                    dispatch(Addpatient.fetchData(data.data));
                })
                .catch((err) => console.log(err));


            console.log(result, "result in action")
            console.log(result, "fetch wala data")

        }
    }


    static removedPatient(payload) {
        console.log(payload, "payload mila k nh ")
        return {
            type: Addpatient.REMOVE_PATIENT,
            payload

        }

    }

    static removePatient(id) {
        return (dispatch) => {
            console.log(id, "id id id")
            return axios.delete('https://patientnode.herokuapp.com/CREATEPATIENT/DELETE/' + id)
                .then((data) => {
                    console.log(id);
                    dispatch(Addpatient.removedPatient(data));
                })
                .catch((err) => console.log(err));

        }
    }

    static removedAllPatients(payload){
        return{
            type: Addpatient.REMOVE_ALL_PATIENTS,
            payload
        }
    }

    static removeAllPatients() {
        return (dispatch) => {
            return axios.put('https://patientnode.herokuapp.com/CREATEPATIENT/DELETE/ALL')
                .then((data) => {
                    console.log(data);
                    dispatch(Addpatient.removedAllPatients(data));
                })
                .catch((err) => console.log(err));

        }
    }


}

