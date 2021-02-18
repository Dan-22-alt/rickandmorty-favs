import { loginWithGoogle, singOutGoogle } from '../firebase'
import { retriveFavs } from './charsDuck'
// constanst
let initialData = {
    loggedIn: false,
    fetching: false
}
let LOGGIN = "LOGGIN"
let LOGGIN_SUCCESS = "LOGGIN_SUCCESS"
let LOGGIN_ERROR = "LOGGIN_ERROR"

let LOG_OUT = "LOG_OUT"

// reducer
export default function reducer(state = initialData, action) {
    switch(action.type) {
        case LOG_OUT:
            return { ...initialData }

        case LOGGIN:
            return { ...state, fetching: true }
        case LOGGIN_SUCCESS:
            return { ...state, fetching: false, ...action.payload, loggedIn: true }
        case LOGGIN_ERROR:
            return { ...state, fetching: false, error: action.payload }
        default:
            return state
    }
}

// aux
function saveStorage(storage) {
    localStorage.storage = JSON.stringify(storage)
}

// action (action creator)
export let logOutAction = () => (dispatch, getState) => {
    singOutGoogle()
    dispatch({
        type: LOG_OUT
    })
    localStorage.removeItem('storage')
}

export let restoreSessionAction = () => dispatch => {
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if ( storage && storage.user ) {
        dispatch({
            type: LOGGIN_SUCCESS,
            payload: storage.user
        })
    }
}

export let doGoogleLoginAction = () => ( dispatch, getState ) => {
    dispatch({
        type: LOGGIN
    })
    return loginWithGoogle()
        .then(user => {
            dispatch({
                type: LOGGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    dispalyName: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL
                }
            })
            saveStorage(getState())
            retriveFavs()(dispatch, getState)
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: LOGGIN_ERROR,
                payload: e.message
            })
        })
}