import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import { connect } from "react-redux";

class Admin extends Component {
    state = { 
        data: [],
        openModal: false,
        selectedId: null
    }

    componentDidMount(){
        Axios.get(API_URL+'/movies')
        .then((res) => {
            this.setState({data: res.data})
            console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderSynopsis = (text) => {
        const arrSyn = text.split(' ')
        var output =[]
        for (var i = 0; i<5; i++){
            output.push(arrSyn[i])
        }
        return output.join(' ') + '...'
    }

    renderMovies = () => {
        let { data, selectedId } = this.state;
        return data.map((val) => {
            if(val.id === selectedId){
                return(
                    <TableRow>
                        <TableCell>
                            {val.id}
                        </TableCell>
                        <TableCell>
                            <Input defaultValue={val.name} innerRef={(name) => this.name = name}/>
                        </TableCell>
                        <TableCell>
                            <Input defaultValue={val.director} innerRef={(directorMov) => this.directorMov = directorMov}/>
                        </TableCell>
                        <TableCell>
                            <Input defaultValue={val.image} innerRef={(image) => this.image = image}/>
                        </TableCell>
                        <TableCell>
                            <Input defaultValue={val.genre} innerRef={(genre) => this.genre = genre}/>
                        </TableCell>
                        <TableCell>
                            <Input defaultValue={val.duration} type='number' innerRef={(duration) => this.duration = duration}/>
                        </TableCell>
                        <TableCell>
                            <Input defaultValue={val.synopsis} innerRef={(synopsis) => this.synopsis = synopsis}/>
                        </TableCell>
                        <TableCell>
                            <Input defaultValue={val.casts} innerRef={(casts) => this.casts = casts}/>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => this.setState({selectedId: null})}>
                                Cancel
                            </Button>
                            <Button onClick={() => this.editMovie(val.id)}>
                                Confirm
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            }
            return(
                <TableRow>
                    <TableCell>{val.id}</TableCell>
                    <TableCell>{val.name}</TableCell>
                    <TableCell>{val.director}</TableCell>
                    <TableCell>{<img src={val.image} alt='poster movie' style={{width: '100px'}}/>}</TableCell>
                    <TableCell>
                    {val.genre.map((genre) => {
                        return(
                            <p>{genre}</p>
                        )
                    })}
                    </TableCell>
                    <TableCell>{val.duration}</TableCell>
                    <TableCell>{this.renderSynopsis(val.synopsis)}</TableCell>
                    <TableCell>
                    {val.casts.map((cast) => {
                        return(
                            <p>{cast}</p>
                        )
                    })}
                    </TableCell>
                    <TableCell>
                        <Button color='primary' onClick={() => this.setState({selectedId: val.id})}>
                            Edit
                        </Button>
                        <Button color='secondary' onClick={() => this.deleteMovie(val.id)}>
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    deleteMovie = (id) => {
        Axios.delete(API_URL +`/movies/${id}`)
        .then((res) => {
            console.log(res.data)
            Axios.get(API_URL + '/movies')
                .then((res) => {
                    // console.log(res.data)
                    this.setState({ data: res.data })
                    alert('Delete Successful!')
                })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    editMovie = (id) => {
        let name = this.name.value;
        let director = this.directorMov.value;
        let image = this.image.value;
        let genre = this.genre.value.split(',');
        let duration = this.duration.value;
        let synopsis = this.synopsis.value;
        let casts = this.casts.value.split(',')
        let data = {
            name,
            director,
            image, 
            genre,
            duration,
            synopsis,
            casts
        }
        Axios.patch(API_URL +`/movies/${id}`, data)
        .then((res) => {
            console.log(res.data)
            Axios.get(API_URL + '/movies')
            .then((res) => {
                this.setState({data: res.data, selectedId: null})
                alert('Edit Successful')
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnAddMovie = () => {
        let name = this.title.value;
        let director = this.directorMov.value;
        let image = this.image.value;
        let genre = this.genre.value.split(', ');
        console.log(genre)
        console.log(this.genre.value)
        let duration = this.duration.value;
        let synopsis = this.synopsis.value;
        let casts = this.casts.value.split(',')
        let data = {
            name,
            director,
            image, 
            genre,
            duration,
            synopsis,
            casts,
            booked: []
        }
        if(name && director && image && genre && duration && synopsis && casts){
            Axios.post(API_URL + `/movies`, data)
            .then((res) =>{
                console.log(res.data)
                Axios.get(API_URL + '/movies')
                .then((res) => {
                    console.log(res.data)
                    this.setState({ data: res.data, openModal: false })
                    alert('Add Successful!')
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert('Please Fill in All the forms')
        }
    }

    render() { 
        let { openModal, selectedId } = this.state;
        console.log(selectedId)
        return ( 
            <div>
                <Button onClick={() => this.setState({openModal: true})}>
                    Add Movie
                </Button>
                <Modal isOpen={openModal}>
                    <ModalHeader>Add New Movie</ModalHeader>
                    <ModalBody>
                        <Label>
                            Movie Title
                        </Label>
                      <Input type='text' innerRef={(title) => this.title = title}/>
                        <Label>
                            Director
                        </Label>
                      <Input type='text' innerRef={(directorMov) => this.directorMov = directorMov}/>
                        <Label>
                            Image URL
                        </Label>
                      <Input type='text' innerRef={(image) => this.image = image}/>
                        <Label>
                            Genre
                        </Label>
                      <Input type='text' innerRef={(genre) => this.genre = genre}/>
                        <Label>
                            Duration
                        </Label>
                      <Input type='number' innerRef={(duration) => this.duration = duration}/>
                        <Label>
                            Synopsis
                        </Label>
                      <Input type='text' innerRef={(synopsis) => this.synopsis = synopsis}/>
                        <Label>
                            Casts
                        </Label>
                      <Input type='text' innerRef={(casts) => this.casts = casts}/>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={() => this.setState({openModal: false})}>Cancel</Button>
                      <Button color="primary" onClick={this.onBtnAddMovie}>Confirm</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <TableHead>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Director</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Synopsis</TableCell>
                        <TableCell>Casts</TableCell>
                        <TableCell>Action</TableCell>
                    </TableHead>
                    <TableBody>
                        {this.renderMovies()}
                    </TableBody>
                </Table>
            </div>
         );
    }
}

const mapStatetoProps = ({ auth }) => {
    return{
        role : auth.username.Admin
    }
}
export default connect (mapStatetoProps)(Admin);