import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
// import MovCard from '../Components/MovCard';

class Checkout extends Component {
    state = {
        data: [],
        namauser: ""
    }
    componentDidMount(){
        // id ambil dari global state
        // connect react-redux
        let username = localStorage.getItem('username')
        Axios.get(API_URL +`/users/?username=${username}`)
        .then((res) => {
            this.setState({data : res.data[0].cart})
            console.log(res.data[0].cart)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    checkout = () => {
      let nama = this.state.namauser
      let data = this.state.data
      let kosong = []
      let { idUser } = this.props;
      console.log(data);
      console.log(nama)
      Axios.post(API_URL + `transaction`, {
          data,
          nama
      })
      Axios.patch(API_URL + `users/${idUser}`, {
          cart: kosong
      })

  }

    rendercart = () => {
    return this.state.data.map((val,index) => {
        return(
            <div>
            <h3>Id = {index+1} </h3>
            <h3>Movie = {val.name} </h3>
            <h3>Seats = {val.seats}</h3>
            <h3>Amount = {val.ticketAmount}</h3>
            <h3>Total = {val.totalPrice}</h3>
            </div>
        )
    })
    }

    PaymentForm = () => {
      return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField required id="cardName" label="Name on card" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required id="cardNumber" label="Card number" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required id="expDate" label="Expiry date" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                label="Remember credit card details for next time"
              />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }

    render() {
        return (
            <div>
                <center>
                <h1>
                    CHECKOUT
                </h1>
                </center>
                <div>
                    {this.rendercart()}
                  
                </div>
            </div>
        )
    }
}
export default Checkout;
