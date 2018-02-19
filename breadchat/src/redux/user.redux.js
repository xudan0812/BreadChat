import axios from 'axios'
import {getRedirectPath} from '../utill'

const ERROR_MESSAGE = 'ERROR_MESSAGE'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  username:'',
  msg:'',
  type:'',
  isAuth:false
}


export function user(state=initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, isAuth:true, redirectTo:getRedirectPath(action.payload), msg:'', ...action.payload}
    case LOGIN_SUCCESS:
      return {...state, isAuth:true, redirectTo:getRedirectPath(action.payload), msg:'', ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MESSAGE:
      return {...state, isAuth:false, msg: action.msg}
    default:
      return state
  }
}

function errorMsg(msg) {
  return {msg, type: ERROR_MESSAGE}
}

function loginSuccess(data) {
  return {type: LOGIN_SUCCESS, payload:data}
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}

export function loadData(userInfo) {
  return {type: LOAD_DATA, payload: userInfo}
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

export function login({username, pwd}) {
  if (!username || !pwd ) {
    return errorMsg("Please enter username and password")
  }
  return dispatch => {
    axios.post('/user/login', {username, pwd})
      .then (res =>{
          if (res.status === 200 && res.data.code === 0) {
            dispatch(loginSuccess(res.data.data))
          } else {
            dispatch(errorMsg(res.data.msg))
          }
        }
      )
  }
}
