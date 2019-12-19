import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const MovCard = (props) => {
  return (
    <div className='mt-2' key={props.id}>
      <Link to={`/movie-detail?id=${props.id}`}>
        <Card style={{width: '300px', cursor: 'pointer'}}>
          <CardImg top width="100%" src={props.image} alt="Card image cap" />
          <CardBody>
            <CardTitle className='movie-title'>{props.title}</CardTitle>
            {
              props.genre.map((val) => {
                return <Button className='btn-custom' color='danger' key={props.index}>{val}</Button>
              })
            }
          </CardBody>
        </Card>
        </Link>
      </div>
  );
};

export default MovCard;