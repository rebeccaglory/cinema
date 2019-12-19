import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import MovCard from '../Components/MovCard';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

class Home extends Component {
    state = { 
        data: []
     }

    componentDidMount(){
        Axios.get(API_URL +`/movies`)
        .then((res) => {
            this.setState({data: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderMovies = () => {
        let { data } = this.state
        return data.map((val, index) => {
            return(
                <div className='col-4 custom-card' key={index}>
                    <MovCard 
                        key={index+5}
                        id={val.id}
                        title={val.name} 
                        genre={val.genre} 
                        director={val.director} 
                        duration={val.duration}
                        image={val.image}
                    />
                </div>
            )
        })
    }

    render() { 
        // console.log(this.props.username)
        console.log(this.props.contoh)
        // console.log(this.props.auth)
        let { data } = this.state;
        // console.log(data)
        if(data === []){
            return(
                <div className='d-flex justify-content-center'>
                    <Loader 
                        type='Circles'
                        color='#DC3545'
                        height={200}
                        width={200}
                    />
                </div>
                )
        }
        return ( 
            <div className='container'>
                {
                    this.props.username
                    ?
                    <Alert color="dark">
                      Hi! {this.props.username}
                    </Alert>
                    :
                    null
                }
                <div className='row justify-content-center'>
                    {this.renderMovies()}
                </div>
                
            </div>
         );
    }
}

const mapStatetoProps = ({ auth, contoh }) => {
    return{
        username: auth.username,
        contoh: contoh.halo,
        userData: auth
    }
}
 
export default connect(mapStatetoProps)(Home);