import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import Swal from 'sweetalert2';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class ChangePass extends Component {
    state = {  }

    getData = () => {
        Axios.get(API_URL + `/users`)
    }
    changePassword = () => {
        let username = this.props.username;
        let pass = this.pass.value;
        let newPass = this.newPass.value;
        let confirmPass = this.confirmPass.value;
        if(newPass === confirmPass){
            Axios.get(API_URL + `/users?username=${username}&password=${pass}`)
            .then((res) => {
            console.log(res.data)
            if(res.data.length === 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid Password',
                  })
            }else{
                Axios.patch(API_URL+`/users/${res.data[0].id}`, {
                    password: newPass
                })
                .then((res) => {
                    console.log(res.data)
                    Swal.fire(
                        'Edit Password Successfull !',
                        'You already change your password',
                        'success',
                      )
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    } 
    render() { 
        return ( 
            <div>

                <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel2a-header"
        >
          <Typography>My Info</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style ={{display : 'flex', flexDirection : 'column'}}>
                
                </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Change Password</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style ={{display : 'flex', flexDirection : 'column'}}>
                Password
                    <Input type='password' innerRef={(pass) => this.pass = pass}/>
                New Password
                    <Input type='password' innerRef={(newPass) => this.newPass = newPass}/>
                Confirm New Password
                    <Input type='password' innerRef={(confirmPass) => this.confirmPass = confirmPass}/>
                <Button  onClick={this.changePassword}>
                    Click Me !
                </Button>
                </ExpansionPanelDetails>
                </ExpansionPanel>
                </div>
         );
    }
}

const mapStatetoProps = (state) => {
    return{
        username : state.auth.username
    }
}

export default connect(mapStatetoProps)(ChangePass);