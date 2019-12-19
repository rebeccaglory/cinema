import React, { Component } from 'react';
import {connect} from 'react-redux';  // Harus ada untuk akses global state
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
// import { MDBseat } from 'mdbreact/dist/css/mdb.css'
import EventSeatIcon from '@material-ui/icons/EventSeat';
// import { MdEventSeat } from 'react-icons/md';
// import { FaBeer } from 'react-icons/fa';
// import {API_URL} from '../support/API_URL'

class SeatReservation extends Component{
    state = {
        movies:[],
        chosen: [],
        price: 0,
        count: 0,
        booked: []
    }

    componentDidMount(){
        var id = this.props.location.state.id;
        console.log('page id : ' + id)
        Axios.get(`http://localhost:2000/movies/${id}`)
        .then((res) => {
            this.setState({
                movies:res.data,
                booked:res.data.booked
            })  
            // console.log(this.state.movie)       // Memasukkan dari 'axios.get' kedalam array dataa dalam state
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
                                        onClick={() => this.Cancel([index,i])}
                                        fontSize={"large"}
                                    />
                                )
                            }
                            return(
                                <EventSeatIcon 
                                key={val.id}
                                    onClick={() => this.book([index, i])} 
                                    fontSize={"large"} 
                                />
                            )
                        })
                    }
                </div>
            )
        })
    }

    PilihSeat = (arr) => {
        let { price,count,chosen } = this.state;
        chosen.push(arr);
        this.setState({
            price: price + 50000,
            count: count + 1,
            chosen: chosen
        })
        console.log(this.state)
    }

    Cancel = (arr) => {
        let{ price,count,chosen } = this.state;
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        this.state({
            price: price - 50000,
            count: count - 1,
            chosen: output
        })
        console.log(this.state)
    }

    book = () => {
        let {chosen} = this.state;
        console.log(this.state.movies)
        var book = this.state.movies.booked;
        for(var i=0; i<chosen.length; i++){
            book.push(chosen[i])
        }
        console.log(book)
        Axios.patch(`http://localhost:2000/movies/${this.state.movies.id}`,{
            booked: book
        })
        .then((res) => {
            Axios.post(`http://localhost:2000/transaction`,{
                username: this.props.username,
                movies: this.state.movies.name,
                ticket_amount: this.state.count,
                totalprice: this.state.price,
                seat: this.state.chosen,
                status: 'Unpaid'
              })
              this.setState({
                  chosen: [],
                  price: 0,
                  count: 0
              })
              alert('Booking Succesfull!')
              this.setState({ redirect: true })
        })
    }

    render() { 
        const { redirect } = this.state;
        let {name} = this.props.location.state
        if (redirect) {
          return <Redirect to={`/`}/>;
        }
           return (
               <div>
                   <center>
                       <div className='row' style={{marginBottom:100, marginTop:100}}>
   
                           <div style={{marginLeft:300, marginRight:100}}>
                               <img src={this.state.movies.image} alt="movie img"/>
                           </div>
   
                           <div>
                           <h2>Tickets For {name}</h2><br/>
                           {this.renderSeat()}
                           <br/>
                           <h4>Tickets: {this.state.count}</h4>
                           <h4>Total Price: Rp.{this.state.price.toLocaleString()}</h4>
                           <button className='btn btn21' onClick={() => { if (window.confirm('Are You Sure You Wish To Book Your Ticket?')) this.book()} }>Book</button>
                           </div>
   
                       </div>
                   </center>
               </div>
             );
       }
   }
   
   const mapStatetoProps = (state) =>{ // Function yang akan terima global state
       return{
         username: state.auth.username, //state.user(merujuk ke index.js reducer).username(masuk ke global state di authReducer)
       }
   }
    
   export default connect(mapStatetoProps)(SeatReservation);