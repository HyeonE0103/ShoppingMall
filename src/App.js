import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import React, {
  createContext,
  lazy,
  Suspense,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";

import "./App.css";
import data from "./data";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Detail = lazy(() => import("./routes/detail.js"));
const Cart = lazy(() => import("./routes/cart.js"));

export let Context1 = createContext();

// let a = new Array(10000).fill(0);
let a = new Array(2).fill(0);

function App() {
  useEffect(() => {
    if (!sessionStorage.getItem("watched")) {
      sessionStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let navigate = useNavigate();
  let [shoes, setShoes] = useState(data);
  let [num, setNum] = useState(2);
  let [wait, setWait] = useState("");
  let [재고] = useState([10, 11, 12]);

  let [name, setName] = useState("");
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name);

  let result = useQuery(
    ["작명"],
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
    { staleTime: 2000 }
  );

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
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && "로딩중"}
            {result.error && "에러"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>Loading...</div>}>
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
                {num <= 3 && (
                  <button
                    onClick={() => {
                      setWait("로딩중");
                      axios
                        .get(
                          `https://codingapple1.github.io/shop/data${num}.json`
                        )
                        .then((결과) => {
                          let copy = [...shoes, ...결과.data];
                          setShoes(copy);
                        })
                        .catch(() => {
                          console.log("실패함");
                        });
                      setNum(num + 1);
                      console.log(num);
                      setWait("");
                    }}
                  >
                    버튼
                  </button>
                )}
                {wait}
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ 재고 }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />
          <Route path="/cart" element={<Cart />} />
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
      </Suspense>
      <div>
        <input
          onChange={(e) => {
            startTransition(() => {
              setName(e.target.value);
            });
          }}
        />
        {isPending
          ? "로딩중이니기다리셈"
          : a.map(() => {
              return <div>{name}</div>;
            })}
      </div>
      {/* <div>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {a.map(() => {
          return <div>{state}</div>;
        })}
      </div> */}
    </div>
  );
}

function Item(props) {
  let navigate = useNavigate();
  return (
    <div
      className="col-md-4"
      onClick={() => {
        navigate("/detail/" + props.i);
      }}
    >
      {props.i < 7 ? (
        <img
          src={
            process.env.PUBLIC_URL +
            "https://codingapple1.github.io/shop/shoes" +
            (props.i + 1) +
            ".jpg"
          }
          width="80%"
        />
      ) : (
        <img
          src={
            process.env.PUBLIC_URL +
            "https://codingapple1.github.io/shop/shoes" +
            (props.i - 6) +
            ".jpg"
          }
          width="80%"
        />
      )}
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
