import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL  } from '../support/API_URL';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addToCart } from '../Redux/Action';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

class SeatReservation extends Component {
    state = { 
        data: [],
        booked: [[0,0], [0,1]],
        chosen: [],
        price: 0,
        count: 0,
        nomorkursi: [],
        nomor: [],
    };

    componentDidMount(){
        let {id} = this.props.location.state
        Axios.get(API_URL + `/movies/${id}`)
        .then((res) => {
            this.setState({booked: res.data.booked})
            // console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnSeatClick = (arr) => {
        // console.log(arr)
        let { chosen, price, count, nomorkursi, nomor } = this.state;
        // if(chosen.length >= 5){
        //     return null
        // }else{
            chosen.push(arr);
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
                nomor : nomorkursi + ' '
            })
            // console.log(chosen)
        // }
    }

    onBtnCancelSeat = (arr) => {
        let { chosen, price, count, nomorkursi, nomor } = this.state;
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        let seat = nomorkursi.map((val) => {
            return val !== nomor
        })
        
        this.setState({
            chosen: output,
            price: price -50000,
            count: count -1,
            nomorkursi : seat,
        })
    }

    renderSeat = () => {
        let seats = 100;
        let { chosen, booked } = this.state;
        console.log(booked)
        // let { booked } = this.props.location.state;
        let arr = [];

        for (let i = 0; i<seats/20; i++){
            arr.push([])
            for (let j = 0; j<seats/(seats/20); j++){
                arr[i].push(1)
            }
        }
        //  console.log(arr)
         for(let k = 0 ; k< booked.length; k++){
            arr[booked[k][0]][booked[k][1]] = 2
        }
        for(let l = 0 ; l< chosen.length; l++){
            arr[chosen[l][0]][chosen[l][1]] = 3
        }

        

        // let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        return arr.map((val, index) => {
            return(
                <div className='d-flex justify-content-center ' key={index}>
                    {
                        val.map((val1,i) => {
                            if(val1 === 2){
                                return (
                                    <EventSeatIcon 
                                        key={val.id}
                                        color={"secondary"}
                                        disabled
                                        fontSize={"large"}
                                    />
                                )
                            }
                            if (val1 ===3){
                                return (
                                    <EventSeatIcon 
                                    key={val.id}
                                        color={"primary"}
                                        onClick={() => this.onBtnCancelSeat([index,i])}
                                        fontSize={"large"}
                                    />
                                )
                            }
                            return(
                                <EventSeatIcon 
                                key={val.id}
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
        console.log(this.props.cart)
        let { name, id, booked } = this.props.location.state;
        let { price, chosen, count, kursi, nomorkursi} = this.state;
        let addCart = {
            name,
            totalPrice: price,
            seats: kursi,
            ticketAmount: count,
            nomorkursi : nomorkursi,
        }
        
        // let alphabet = 'ABCDE'
        // let arr = []
        // for (let i = 0; i < chosen.length; i++) {
        //     arr.push(alphabet.charAt(chosen[i][0])+chosen[i][1])
        // }
        
        console.log(addCart)
        cart.push(addCart)
        console.log(cart)
        booked.push(...chosen)
        if (count === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your Seat is not Selected!',
              })
        } else {
            Axios.patch(API_URL + `/users/${idUser}`, {
                cart: cart
            })
            .then((res) => {
                console.log(res.data)
                Axios.patch(API_URL + `/movies/${id}`,{
                    booked: booked
                })
                .then((res) => {
                    console.log(res.data)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }    
    }
    render() { 
        console.log(this.props.cart)
        // console.log(this.props.location.state)
        let { name } = this.props.location.state;
        console.log(name)
        return ( 
            <div className='container full-height'>
                <div className='d-flex justify-content-center'>
                    <h1>Choosing Seats for { name }</h1>
                </div>
                    {this.renderSeat()}
                <div style={{float: 'right'}}>
                    <h3>
                        Rp. {this.state.price.toLocaleString()}
                    </h3>
                    <h3>
                        {this.state.nomorkursi} Seats
                    </h3>
                    <h3>
                        {this.state.nomor} Seats Number
                    </h3>
                    <Link to='/cart'  onClick = {this.addToCart}>
                        <Button color='danger'>
                                Add To Cart
                        </Button>
                    </Link>
                </div>
            
            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return{
        idUser: auth.id,
        cart: auth.cart
    }
}
 
export default connect(mapStatetoProps, { addToCart })(SeatReservation);