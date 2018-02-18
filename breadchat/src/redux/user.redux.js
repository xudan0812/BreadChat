import axios from 'axios'
import {getRedirectPath} from '../utill'

const ERROR_MESSAGE = 'ERROR_MESSAGE'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

const initState = {
  redirectTo: '',
  username:'',
  msg:'',
  type:'',
  pwd:'',
  isAuth:false
}


export function user(state=initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, isAuth:true, redirectTo:getRedirectPath(action.payload), msg:'', ...action.payload}
    case ERROR_MESSAGE:
      return {...state, isAuth:false, msg: action.msg}
    default:
      return state
  }
}

function errorMsg(msg) {
  return {msg, type: ERROR_MESSAGE}
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}

export function register({username, pwd, confirmpwd, type}) {
  if (!username || !pwd || !confirmpwd) {
    return errorMsg("Please enter username and password")
  }
  if (pwd !== confirmpwd) {
    return errorMsg("Password does not match")
  }
  return dispatch => {
    axios.post('/user/register', {username, pwd, type})
      .then (res =>{
          if (res.status === 200 && res.data.code === 0) {
            dispatch(registerSuccess({username, pwd, type}))
          } else {
            dispatch(errorMsg(res.data.msg))
          }
        }
      )
  }
}
