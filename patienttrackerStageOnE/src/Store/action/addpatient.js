import { AsyncStorage } from 'react-native'


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
            AsyncStorage.getItem('patients', (err, result) => {
                result = JSON.parse(result)
                if (result && Array.isArray(result)) {
                    result = result.concat(data)
                } else {
                    result = [data]
                }

                AsyncStorage.setItem('patients', JSON.stringify(result), () => {

                });

                dispatch(Addpatient.addData(result))


                
                // dispatch({
                //     type: Addpatient.ADDDATA,
                //     payload: result
                // })
                // console.log(result, "results")
            })
            //console.log(result, "data");

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
            AsyncStorage.getItem('patients', (err, result) => {
                console.log(result, "result in action")
                dispatch(Addpatient.fetchData(JSON.parse(result)));
                console.log(result, "fetch wala data")
            })
        }
    }


    static removedPatient(payload) {
        console.log(payload, "payload mila k nh ")
        return {
            type: Addpatient.REMOVE_PATIENT,
            payload

        }

    }

    static removePatient(i, data) {
        return (dispatch) => {
            console.log(data, 'action remove ka data', i, "action remove ka index")
            data.splice(i, 1);
            console.log(data, 'reomve kr k naya araay bnaya')
            AsyncStorage.setItem('patients', JSON.stringify(data), () => {
                console.log(data, "asycnch reomve")
            // AsyncStorage.getItem('patients', (err, result) => {
            //    // console.log(result, "result in action")
            //     dispatch(Addpatient.fetchData(JSON.parse(result)));
            //    // console.log(result, "fetch wala data")
            // })
                
            });

            dispatch(Addpatient.removedPatient(data));
        }
    }

    static removeAllPatients(){
        AsyncStorage.removeItem('patients');
        return {
            type: Addpatient.REMOVE_ALL_PATIENTS,
            payload: []
            
        }
    }


}

