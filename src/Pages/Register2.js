import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'
import Axios from 'axios';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';
import { API_URL } from '../support/API_URL';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';


class Register extends Component {
    state = { 
        loading: false,
        error: false,
        char: false,
        spec: false,
        num: false,
        show: false,
        border: false
     }

    registerUser = () => {
        let { char, spec, num } = this.state
        let email = this.refs.email.value;
        let username = this.text.value;
        let password = this.pass.value;
        let confirmPass = this.confirmPass.value;
        // let role = 'user';
        if(username && password && email && confirmPass){
            if(password !== confirmPass){
                alert('Invalid Password')
            }else{
                Axios.get(API_URL +`/users?username=${username}`)
                .then((res) => {
                    // console.log(res.data)
                    if(res.data.length !==0){
                        alert('username has been taken')
                    }else{
                        if(char && spec && num){
                            Axios.post(API_URL +`/users`, {
                                username,
                                password,
                                email,
                                role: 'user'
                            })
                            .then((res) => {
                                // console.log(res.data)
                                this.props.Login(res.data)
                            })
                        }else{
                            alert('Please Fill the Password Requirements')
                        }
                    }
                })
            }
        }else{
            alert('Please fill in all the forms!')
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
///// !== ''
    render() {
        let { char, spec, num, show, border } = this.state
        if(this.props.username){
            return(
                <Redirect to='/'>

                </Redirect>
            )
        } 
        return ( 
        <div className='container'>
            <div className='d-flex justify-content-center'>
                <form className='box'>
                <div className='p-5'>
                    <h1 style={{textAlign:"center"}}>Join Us!</h1>
                    Username
                    <input type='text' ref='username' className='form-control mt-3' placeholder='Username'/>
                    Email
                    <input type='text' ref='email' className='form-control mt-3' placeholder='Email'/>
                    Password
                    <Input type='password' innerRef={(pass) => this.pass = pass} onChange={this.handleChange} onFocus={this.showReq} style={{borderColor: border ? 'green' : 'red'}}/>
                    Confirm Password
                    <Input type='password' innerRef={(confirmPass) => this.confirmPass = confirmPass}/>
                    {
                        this.state.loading
                        ?
                        <Loader style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}} type="ThreeDots" color='black'/>
                        :
                        <Button size='lg' style={{borderRadius:'24px', backgroundColor:'white', color:'black'}} onClick={this.onBtnSignIn} className='form-control mt-3 login-btn pb-1' >Sign Up</Button>
                    }
                    
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p className='mt-3 desc'>
                            Already have an Account? 
                            <Link to='/login'>
                                <span style={{textDecoration : "underline"}}> Login! </span>
                            </Link>
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
                </p>
                </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return{
        username: auth.username
    }
}
 
export default connect(mapStateToProps, { Login })(Register);