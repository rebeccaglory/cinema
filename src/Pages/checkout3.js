import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Logout } from "../Redux/Action"
import { connect } from "react-redux";
// import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from "../support/API_URL";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
// import { addToCart } from "../redux/action/";

const onBtnLogout = () => {
    Logout()
    localStorage.removeItem('username')
    alert("terlogout dengan sukses~")
    // < Redirect to = '/' >

    //     </Redirect >
}



class Profile extends Component {

    state = {
        data: [],
        totalPrice: 0,
        namauser: ""
    }

    componentDidMount() {
        let username = localStorage.getItem('username')
        Axios.get(API_URL + `users?username=${username}`)
            .then((res) => {
                this.setState({
                    data: res.data[0].cart,
                    namauser: res.data[0].username
                })
                var jumlahsemua = res.data[0].cart[0].totalPrice
                var banyak = res.data[0].cart
                var output = 0
                console.log(res.data[0].username)
                console.log(res.data)
                for (var i = 0; i < banyak.length; i++) {
                    output += res.data[0].cart[i].totalPrice;
                }
                this.setState({
                    totalPrice: output
                })
                console.log(output);
                console.log(jumlahsemua);
                console.log(res.data[0].cart);

            })
            .catch((err) => {
                console.log(err)
            })
    }

    totalharga = () => {
        let data = this.state.data
        console.log(data);

        // console.log(data[0].cart[0].totalPrice)
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

    rendertiket = () => {
        let data = this.state.data
        console.log(data);
        return data.map((val) => {
            console.log(val);
            var kursi = val.nomorkursi
            var tes = "";
            console.log(kursi);
            for (var i = 0; i < kursi.length; i++) {
                tes += kursi[i] + ", "
            }
            console.log(tes);

            return (
                <Paper>
                    <Grid container spacing={2} padding="10%">
                        <Grid item xs={4} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        movie name = {val.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        sebanyak = {val.ticketAmount} kursi
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        dengan total harga = Rp. {val.totalPrice.toLocaleString()}
                                    </Typography>
                                    nomor kursi = {tes}
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="default"
                                    startIcon={<SaveIcon />}
                                >
                                    delete ticket
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                </Paper>
            )
        })
    }

    render() {
        console.log(this.state.totalPrice);
        console.log(this.props.cart);

        return (

            <div>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ExitToAppIcon />}
                        onClick={onBtnLogout}
                        href="/ ">
                        Logout
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AccountBoxIcon />}
                        href='/ganti'>
                        Ganti Password
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<SaveIcon />}
                        href="/transaction-history">
                        liat transaction detail
                                </Button>
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                        {this.rendertiket()}
                        <Grid item>
                            <br></br>
                            <Typography variant="body2" color="textSecondary">
                                {this.totalharga()}
                                total semua harga tiket adalah = Rp. {this.state.totalPrice.toLocaleString()}
                            </Typography>
                        </Grid>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<SaveIcon />}
                            onClick={this.checkout}
                            href="/"
                        >
                            checkout
                                </Button>
                    </Typography>
                </Container>
            </div >
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return {
        idUser: auth.id,
    }
}
export default connect(mapStatetoProps, { Logout })(Profile);