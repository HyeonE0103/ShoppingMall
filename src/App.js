import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import { Link, Route, Routes, useNavigate, Outlet } from "react-router-dom";

import "./App.css";
import data from "./data";
import Detail from "./routes/detail";
import axios from "axios";

function App() {
  let navigate = useNavigate();
  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link href="/event">Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map(function (a, i) {
                    return <Item shoes={shoes[i]} i={i} key={i} />;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((결과) => {
                      let copy = [...shoes, ...결과.data];
                      setShoes(copy);
                      console.log(copy);
                    })
                    .catch(() => {
                      console.log("실패함");
                    });
                }}
              >
                버튼
              </button>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route
          path="/event"
          element={
            <>
              <h1>오늘의 이벤트</h1>
              <Outlet></Outlet>
            </>
          }
        >
          <Route path="one" element={<h3>첫 주문시 양배추즙 서비스</h3>} />
          <Route path="two" element={<h3>생일기념 쿠폰받기</h3>} />
        </Route>
        <Route path="*" element={<div>없는페이지 404</div>} />
      </Routes>
    </div>
  );
}

function Item(props) {
  let link = "/detail/" + props.i;
  return (
    <div className="col-md-4">
      <Nav.Link href={link}>
        <img
          src={
            process.env.PUBLIC_URL +
            "https://codingapple1.github.io/shop/shoes" +
            (props.i + 1) +
            ".jpg"
          }
          width="80%"
        />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
        <p>{props.shoes.price}</p>
      </Nav.Link>
    </div>
  );
}

export default App;
