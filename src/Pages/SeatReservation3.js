import React, { Component } from 'react';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { addToCart } from "../Redux/Action"

class SeatReservation extends Component {
    state = {
        data: [],
        booked: [[1, 0], [0, 1]],
        chosen: [],
        price: 0,
        count: 0,
        nomorkursi: [],
        nomor: []
    };


    componentDidMount() {
        let { id } = this.props.location.state
        Axios.get(API_URL + `movies/${id}`)
            .then((res) => {
                this.setState({ booked: res.data.booked })
                // console.log(this.state.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    onBtnSeatClick = (arr) => {
        console.log(this.state.price)
        let { chosen, price, count, nomorkursi, nomor } = this.state;
        // if(chosen.length >= 5){
        //     return null
        // }else{
        chosen.push(arr);
        // var alphabet = ["a", "b", "c", "d", "e"]
        // for (let l = 0; l < 1; l++) {
        //     nomorkursi += (alphabet[arr[0]] + arr[1])
        // }
        // let aaa = this.state.kursi.toString()
        let kursi = []
        if (arr[0] === 0) {
            kursi = "A"
            nomor = kursi + arr[1]
        }
        if (arr[0] === 1) {
            kursi = "B"
            nomor = kursi + arr[1]
        }
        if (arr[0] === 2) {
            kursi = "C"
            nomor = kursi + arr[1]
        }
        if (arr[0] === 3) {
            kursi = "D"
            nomor = kursi + arr[1]
        }
        if (arr[0] === 4) {
            kursi = "E"
            nomor = kursi + arr[1]
        }
        nomorkursi.push(nomor)
        this.setState({
            chosen,
            price: price + 50000,
            count: count + 1,
            nomorkursi,
            nomor
        })
    }

    // nomorkursi = () => {
    //     let { chosen, nomor } = this.state;
    //     nomor.push(...chosen)
    //     // var aaa = nomor.slice(1, 2);
    //     // var cccc = aaa.splice(0, 1, "a1");
    //     var bbb = nomor.toString()
    //     console.log(nomor)
    //     console.log(chosen)
    //     console.log(bbb)
    //     // console.log(aaa)
    //     // console.log(cccc)
    // }

    onBtnCancelSeat = (arr) => {

        console.log(this.state.price)
        let { chosen, price, count, nomorkursi, nomor } = this.state;
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        let aaa = nomorkursi.filter((val) => {
            return val !== nomor

            //return val.join("") !== nomor.join("")
        })
        console.log(aaa);
        console.log(nomor);
        console.log(nomorkursi);

        this.setState({
            chosen: output,
            price: price - 50000,
            count: count - 1,
            nomorkursi: aaa
        })
    }

    nomorkursi = (arr) => {



        // let aaa = []
        // let seats = 100;
        // for (let i = 0; i < seats / 20; i++) {
        //     arr.push([])
        //     for (let j = 0; j < seats / (seats / 20); j++) {
        //         arr[i].push(i)
        //     }
        // }
        // for (let z = 0; z < seats / (seats / 20); z++) {

        // }

        // console.log(arr)
    }

    renderSeat = () => {
        let seats = 100;
        let { chosen, booked } = this.state;
        let arr = [];
        for (let i = 0; i < seats / 20; i++) {
            arr.push([])
            for (let j = 0; j < seats / (seats / 20); j++) {
                arr[i].push(1)
            }
        }
        console.log(arr)
        for (let k = 0; k < booked.length; k++) {
            arr[booked[k][0]][booked[k][1]] = 2
        }
        for (let l = 0; l < chosen.length; l++) {
            arr[chosen[l][0]][chosen[l][1]] = 3
        }// let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');// console.log(alphabet)
        return arr.map((val, index) => {
            return (
                <div className='d-flex justify-content-center '>
                    {
                        val.map((val1, i) => {
                            if (val1 === 2) {
                                return (
                                    <EventSeatIcon
                                        color={"secondary"}
                                        disabled
                                        fontSize={"large"} />
                                )
                            }
                            if (val1 === 3) {
                                return (
                                    <EventSeatIcon
                                        color={"primary"}
                                        onClick={() => this.onBtnCancelSeat([index, i])}
                                        fontSize={"large"}
                                    />
                                )

                            }
                            return (
                                <EventSeatIcon
                                    onClick={() => this.onBtnSeatClick([index, i])}
                                    fontSize={"large"}
                                />
                            )
                        })
                    }
                </div>
            )
        })

    }

    addToCart = () => {
        let { cart, idUser } = this.props;
        let { name, id, booked } = this.props.location.state;
        let { price, chosen, count, kursi } = this.state;
        let addCart = {
            name,
            totalPrice: price,
            seats: kursi,
            ticketAmount: count,

        }
        console.log(addCart)
        cart.push(addCart)
        booked.push(...chosen)

        Axios.patch(API_URL + `users/${idUser}`, {
            cart: cart
        })
            .then((res) => {
                console.log(res.data)
                Axios.patch(API_URL + `movies/${id}`, {
                    booked: booked
                })
                    .then((res) => {
                        alert("tiket sukses terbooking ")
                        console.log(res.data)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        let { name, image, genre, casts } = this.props.location.state;
        console.log(this.props.location.state)
        console.log(this.state.nomorkursi);
        console.log(this.state.nomor);

        return (
            <div className='container full-height'>
                <div className='d-flex justify-content-center'>
                    <h1>Choosing Seats for {name} </h1>
                </div>
                {this.renderSeat()}
                {this.nomorkursi()}
                <div>
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase >
                                    <img alt="complex" src={image} width="35%" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            {name}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {casts}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {genre}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            startIcon={<SaveIcon />}
                                            onClick={this.addToCart}
                                        >
                                            Add to cart
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Rp. {this.state.price.toLocaleString()}</Typography>
                                    <Typography variant="subtitle1">{this.state.count} Seats</Typography>
                                    <Typography variant="subtitle1">seats number {this.state.nomor}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return {
        idUser: auth.id,
        cart: auth.cart
    }
}

export default connect(mapStatetoProps, { addToCart })(SeatReservation);