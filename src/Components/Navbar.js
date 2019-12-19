import React from 'react';
// import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';
// import { NavbarToggler } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Logout } from '../Redux/Action';
import { Nav, Form,Button,FormControl,Navbar } from 'react-bootstrap';
// import { Alert } from 'reactstrap';

const Example = (props) => {
  let { role, Logout,  } = props;
  console.log(role)
  // const [collapsed, setCollapsed] = useState(true);

  // const toggleNavbar = () => setCollapsed(!collapsed);
  

  const onBtnLogout = () =>{
    Logout()
    localStorage.removeItem('username')
  }

  if(role === 'user'){
    console.log('in')
    return(
      <div>
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="/">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/cart">Cart</Nav.Link>
      <Nav.Link href="/" onClick={onBtnLogout}>Logout</Nav.Link>
      <Nav.Link href='/user'>Account {localStorage.getItem('username')}</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
    <div>
    </div>
  </Navbar>

    </div>
    )
  }else if(role === 'admin'){
    return(
      <div>
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/admin">Manage Movie</Nav.Link>
      <Nav.Link href="/" onClick={onBtnLogout}>Logout</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
    </div>
    )
  }else{
    return (
      <div>
       <Navbar bg="light" variant="light">
    <Navbar.Brand href="/">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/login" inline>Login</Nav.Link>
      <Nav.Link href="/register" >Register</Nav.Link>
    </Nav>
  </Navbar>
      </div>
    );
  }
}

const mapStatetoProps = ({auth}) => {
  return{
    role: auth.role,
    username: auth.username
  }
}

export default connect(mapStatetoProps,{ Logout })(Example);