import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {register} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

@connect (
  state => state.user,
  {register}
)
class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      pwd: '',
      confirmpwd: '',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      [key] : val
    })
  }
  handleRegister() {
    this.props.register(this.state)
  }

  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <h2>Register</h2>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p>: null}
            <InputItem
              onChange={v=>this.handleChange('username', v)}
            >Username</InputItem>
            <WhiteSpace/>
            <InputItem
              type='password'
              onChange={v=>this.handleChange('pwd', v)}
            >Password</InputItem>
            <WhiteSpace/>
            <InputItem
              labelNumber={10}
              type='password'
              onChange={v=>this.handleChange('confirmpwd', v)}
            >Confirm Password</InputItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.state.type==='genius'}
              onChange={()=>this.handleChange('type', 'genius')}
            >
              Genius
            </RadioItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.state.type==='boss'}
              onChange={()=>this.handleChange('type', 'boss')}
            >
              Boss
            </RadioItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.handleRegister} type='primary'>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register