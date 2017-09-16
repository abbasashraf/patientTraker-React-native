
import firebase from '../../firebase'


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

    static addStorage(data) {
        return (dispatch) => {
            var dataRef = firebase.database().ref('patients/').push(data);
            dataRef.then(() => {
                dispatch(Addpatient.addData(data))

            }).catch((err) => {
                console.log(err)
            });
        }
    }

    static fetchData(fetchData) {
        return {
            type: Addpatient.FETCHDATA,
            payload: (fetchData || []),
        }
    }
    static fetchStorage() {
        return (dispatch) => {
            var getData = firebase.database().ref('patients/');
            getData.on("value", (snapshot) => {
                var obj = snapshot.val();
                var arrr = [];
                for (var key in obj) {
                    arrr.push(obj[key]);
                }

                dispatch(Addpatient.fetchData(arrr))

            })
        }
    }


    // static removePatient() {
    //     return {
    //         type: Addpatient.REMOVE_PATIENT,
    //     }

    // }

    // static removedPatient(i) {
    //     return (dispatch) => {
    //         var getData = firebase.database().ref("patients/");
    //         getData.once('value', snap => {
    //             var userObj = snap.val();
    //             var keys = []
    //             for (let key in userObj) {
    //                 keys.push(key)
    //             }

    //             firebase.database().ref('patients/' + keys[i]).remove();
    //             dispatch({
    //                 type: Addpatient.REMOVE_PATIENT,
    //             })
    //         })
    //     }

    // }


    // static removedPatient(index) {
    //     return (dispatch) => {
    //         firebase.database().ref('patientRecord').once('value', snap => {
    //             const patientRecord = snap.val();
    //             var keys = [];
    //             for (let key in patientRecord) {
    //                 keys.push(key)
    //             }
    //             console.log("keys: ", keys)
    //             firebase.database().ref('patientRecord/' + keys[index]).remove()
    //         })
    //             .then((data) => dispatch({
    //                 type: PatientsRecord.REMOVEPATIENT,
    //                 payload: data
    //             }))
    //             .catch((err) => console.log('err while deleting: ', err))
    //     }
    // }



    static removeAllPatients() {
        firebase.database().ref('patients/').remove();
        return {
            type: Addpatient.REMOVE_ALL_PATIENTS,
            payload: []

        }
    }


}

