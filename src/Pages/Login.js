import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Login } from '../Redux/Action';
import { connect } from 'react-redux';
// import Axios from 'a z
class LoginPage extends Component {
    state = { 
        error: false
    }
    
    onBtnLogIn = () => {
        // let { Login } = this.props;
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        this.props.Login(username, password)
        localStorage.setItem('username', username)
    }
    
    render() {
        console.log(this.props.username)
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
                        <h1 style={{textAlign:"center"}}>Welcome Back!</h1>
                    <input ref='username' type='text' className='form-control mt-3' placeholder='Username'/>
                    <input ref='password' type='password' className='form-control mt-3' placeholder='Password'/>
                    {
                        this.state.error 
                        ? 
                        <div className='alert alert-danger mt-3'>
                        {this.state.error} 
                        <span onClick={() => this.setState({error : ''})} style={{fontWeight:"bolder", cursor:"pointer", float:"right"} }>x</span></div>
                        :
                        null 
                    }
                    <Button size='lg' style={{borderRadius:'24px', backgroundColor:'white', color:'black', marginTop: '20px'}} className='form-control login-btn' onClick={this.onBtnLogIn}>Sign In</Button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p className='mt-3'>
                            Don't have an account? 
                        <Link to='/register'>
                            <span style={{textDecoration : "underline"}}> Create yours today! </span>
                        </Link>
                        </p>
                    </div>
                    </form>

                </div>
            </div>
         );
    }
}

const mapStatetoProps = ({ auth }) => {
    return{
        username: auth.username
    }
}
 
export default connect(mapStatetoProps, { Login })(LoginPage);