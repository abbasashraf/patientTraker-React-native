import { Addpatient } from '../action/addpatient.js';
const INITIAL_STATE = {
    // push: false, 
    // getData: false,
    data: [],
    getData:false
}
export var AddPatientReducer = (state = INITIAL_STATE, action) => {
   // console.log(Addpatient.ADDDATA)
    switch (action.type) {
        case Addpatient.ADDDATA:
        console.log('action ma jo payload mil raha hai',action.payload)
        return { ...state, data: action.payload }
        case Addpatient.FETCHDATA:
        return {...state, data: action.payload || [], getData:true}
        case Addpatient.REMOVE_PATIENT:
        console.log('reducer ma jo remove hua ha k nh',action.payload)
        return{...state, data: action.payload}
        case Addpatient.REMOVE_ALL_PATIENTS:
        return { ...state, data: action.payload}
        default:
        return state
    }

}