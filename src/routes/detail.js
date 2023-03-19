import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { order } from "./../store/stockSlice";

import { Context1 } from "./../App.js";
import { useDispatch } from "react-redux";

let Btn = styled.button`
  padding: 10px;
  margin: 10px;
  color: ${(props) => (props.bg == "black" ? "white" : "black")};
  background: ${(props) => props.bg};
`;

let Div = styled.div`
  height: 60px;
  background: #f5f6ce;
  font-size: 18px;
  margin: 15px;
  text-align: center;
  line-height: 60px;
`;

function Detail(props) {
  let { 재고 } = useContext(Context1);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let { id } = useParams();
  let [notice, setNotice] = useState(true);
  let [num, setNum] = useState("");
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState("");

  const sh = props.shoes.find((x) => {
    return x.id == id;
  });

  useEffect(() => {
    let obj = localStorage.getItem("watched");
    obj = JSON.parse(obj);
    obj.push(sh.id);

    obj = new Set(obj);
    obj = Array.from(obj);
    localStorage.setItem("watched", JSON.stringify(obj));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      setNotice(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isNaN(num) == true) {
      alert("그러지마세요");
    }
  }, [num]);

  return (
    <div className={"container start " + fade}>
      {notice == true ? <Div>2초이내 구매시 할인</Div> : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              process.env.PUBLIC_URL +
              "https://codingapple1.github.io/shop/shoes" +
              (Number(id) + 1) +
              ".jpg"
            }
            width="80%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{sh.title}</h4>
          <p>{sh.content}</p>
          <p>{sh.price}</p>
          <Btn
            bg="black"
            onClick={() => {
              dispatch(order(sh));
            }}
          >
            주문하기
          </Btn>
          <Btn
            bg="black"
            onClick={() => {
              navigate("/cart");
            }}
          >
            장바구니로 이동
          </Btn>
          <input
            onChange={(e) => {
              setNum(e.target.value);
            }}
          />
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState("");
  let { 재고 } = useContext(Context1);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [tab]);

  return (
    <div className={"start " + fade}>
      {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}
export default Detail;
