import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import data from "./data";

function App() {
  let [shoes] = useState(data);

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
          {shoes.map(function (a, i) {
            return <Item shoes={shoes[i]} i={i} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Item(props) {
  return (
    <div className="col-md-4">
      <img
        src={process.env.PUBLIC_URL + "/img/shoes" + (props.i + 1) + ".jpg"}
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
