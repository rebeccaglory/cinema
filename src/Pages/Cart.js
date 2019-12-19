import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import { Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';
// import {connect} from 'react-redux';
import { Table } from 'reactstrap';

class Cart extends Component {
    state = { 
        data: []
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
    onBtnCancel = (id,seat,movies) =>{
        Axios.delete(API_URL + `/transaction/${id}`)
        .then((res) => {
            this.componentDidMount()
        })
        .catch((err) => {
            console.log(err)
        })

        Axios.get(API_URL + `/movies?name=${movies}`)
        .then((res) => {
            var book = res.data[0].booked;
            var id = res.data[0].id;

            for(var i=0; i<seat.length; i++){
                for(var j=0; j<book.length; j++){
                    if(seat[i][0]===book[j][0] && seat[i][1]===book[j][1]){
                        console.log(j)
                        book.splice(j, 1);
                    }
                }
            }
        
        Axios.patch(API_URL + `/movies/${id}`, {
            booked: book })
        .then((res) => {
            alert('Booking Cancelled')
        })
        .catch((err) => {
            console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // Checkout = (id) => {
    //     Axios.get(API_URL + `/transaction?username=${id}`)
    //         .then((res) => {
    //             console.log(res.data)
    //             res.data.forEach(element => {
    //                 Axios.patch(API_URL + `/transaction/${element.id}`)
    //             });
    //             alert('Sukses!')
    //             this.componentDidMount()
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    renderCart = () => {
        console.log('halo')
        //map isi this.state.data
        // map jadi tbody === html
        // TableRow === reactstrap
    }

    totalharga = () => {
        let output = 0
        this.state.data.map((val) => {
            return output += val.totalPrice
        })
    }

    Checkout = () => {
        let nama = this.state.namauser
        let data = this.state.data
        let kosong = []
        let { id } = this.state.id;
        console.log(data);
        console.log(nama)
        Axios.post(API_URL + `transaction`, {
            data,
            nama
        })
        Axios.patch(API_URL + `users/${id}`, {
            cart: kosong
        })

    }

    renderisi = () => {
        return this.state.data.map((val, index)=> {
            return(

                <tbody>
                    <tr>
                        <td>{index+1}</td>
                        <td>
                            {val.name}
                        </td>
                        <td>{val.nomorkursi}</td>
                        <td>{val.ticketAmount}</td>
                        <td>{val.totalPrice}</td>
                        <td>
                        <Button color='danger' onClick={this.onBtnCancel}>Delete</Button>
                        </td>
                    </tr>
                </tbody>
                
            )
        })
    }
    onBtnCancel = (id,seat,name) =>{
        Axios.delete(API_URL + `/transaction/${id}`)
        .then((res) => {
            this.componentDidMount()
        })
        .catch((err) => {
            console.log(err)
        })

        Axios.get(API_URL + `/movies?name=${name}`)
        .then((res) => {
            var book = res.data[0].booked;
            var id = res.data[0].id;

            for(var i=0; i<seat.length; i++){
                for(var j=0; j<book.length; j++){
                    if(seat[i][0]===book[j][0] && seat[i][1]===book[j][1]){
                        console.log(j)
                        book.splice(j, 1);
                    }
                }
            }
        
        Axios.patch(API_URL + `/movies/${id}`, {
            booked: book })
        .then((res) => {
            alert('Booking Cancelled')
        })
        .catch((err) => {
            console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    render() { 
        // let { totalPrice } = this.state;
        return (
            <div>
                <center>

            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Movie Title</th>
                    <th>Seats</th>
                    <th>Amount</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
              </thead>   
              {this.renderisi()}
            </Table>
        {/* <Link to = '/checkout'> */}
        <Button onClick={() => {this.Checkout()}}>
                    Checkout
                </Button>
        {/* </Link> */}
            <h3> Total Harga = Rp. {this.totalharga}</h3>
        </center>
        </div>
    );
    }
}


export default Cart;