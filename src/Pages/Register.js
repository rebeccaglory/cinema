import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'
import Axios from 'axios';
import { connect } from 'react-redux'
import { Login } from '../Redux/Action'
import { Redirect } from 'react-router-dom'
import { API_URL } from '../support/API_URL';

class Register extends Component {
    state = { 
        char: false,
        spec: false,
        num: false,
        show: false,
        border: false
     }

    registerUser = () => {
        let { char, spec, num } = this.state
        let username = this.text.value;
        let email = this.text.value;
        let password = this.pass.value;
        let confirmPass = this.confirmPass.value;
        let role = 'user';
        if(password !== confirmPass){
            alert('Invalid Password')
        }else{
            Axios.get(API_URL +`/users?username=${username}`)
            .then((res) => {
                console.log(res.data)
                if(res.data.length !==0){
                    alert('username has been taken')
                }else{
                    if(char && spec && num){
                        Axios.post(API_URL +`/users`, {
                            username,
                            email,
                            password,
                            role,
                            cart : [],
                            Transaction : [],

                        })
                        .then((res) => {
                            // console.log(res.data
                            this.props.Login(res.data)
                        })
                        
                    }else{
                        alert('Please Fill the Password Requirements')
                    }
                }
            })
        }
    }

    handleChange = (e) => {
        let pass = e.target.value
        let num = /[0-9]/
        let spec = /[!@#$%^&*;]/
        this.setState({
            num: num.test(pass), 
            spec: spec.test(pass), 
            char: pass.length > 7,
            border: (num.test(pass) && spec.test(pass) && (pass.length > 7))
        })

    }
    showReq = () => {
        this.setState({show: true})
    }

    render() {
        let { char, spec, num, show, border } = this.state
        if(this.props.username !== ''){
            return(
                <Redirect to='/'>

                </Redirect>
            )
        } 
        return ( 
            <div className='d-flex justify-content-center'>
                <div>
                    Username
                    <Input type='text' innerRef={(text) => this.text = text}/>
                    Email
                    <input type='text' ref='email' className='form-control mt-3' placeholder='Email'/>
                    Password
                    <Input type='password' innerRef={(pass) => this.pass = pass} onChange={this.handleChange} onFocus={this.showReq} style={{borderColor: border ? 'green' : 'red'}}/>
                    Confirm Password
                    <Input type='password' innerRef={(confirmPass) => this.confirmPass = confirmPass}/>
                    {/* <Link to='/login'> */}
                    <Button  onClick={this.registerUser}>
                        Click Me !
                    </Button>
                    {/* </Link> */}
                    {
                        show
                        ?
                        <div>
                        {
                            char
                            ?
                            <div style={{color: 'green'}}>
                                Password length must be 8 or more Characters
                            </div>
                            :
                            <div style={{color: 'red'}}>
                                Password length must be 8 or more Characters
                            </div>
                        }
                        {
                            spec
                            ?
                            <div style={{color: 'green'}}>
                                Password must include special characters
                            </div>
                            :
                            <div style={{color: 'red'}}>
                                Password must include special characters
                            </div>
                        }
                        {
                            num
                            ?
                            <div style={{color: 'green'}}>
                                Password must include number
                            </div>
                            :
                            <div style={{color: 'red'}}>
                                Password must include number
                            </div>
                        }
                        </div>
                        :
                        null
                    }
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        username: state.auth.username
    }
}
 
export default connect(mapStateToProps, { Login })(Register);