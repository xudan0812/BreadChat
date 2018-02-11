import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      type:'genius'
    }
  }

  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo/>
        <h2>Register</h2>
        <WingBlank>
          <List>
            <InputItem>Username</InputItem>
            <WhiteSpace/>
            <InputItem>Password</InputItem>
            <WhiteSpace/>
            <InputItem
              labelNumber={10}
            >Confirm Password</InputItem>
            <WhiteSpace/>
            <RadioItem checked={this.state.type==='genius'}>
              Genius
            </RadioItem>
            <WhiteSpace/>
            <RadioItem checked={this.state.type==='boss'}>
              Boss
            </RadioItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.register} type='primary'>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register