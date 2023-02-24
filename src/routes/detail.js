import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

let Btn = styled.button`
  padding: 10px;
  margin: 10px;
  color: ${(props) => (props.bg == "black" ? "white" : "black")};
  background: ${(props) => props.bg};
`;

let Div = styled.div`
  width: 250px;
  height: 150px;
  background: yellow;
`;

function Detail(props) {
  let { id } = useParams();
  let [alert, setAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  }, []);

  const sh = props.shoes.find((x) => {
    return x.id == id;
  });

  return (
    <div className="container">
      {alert == true ? <Div>2초이내 구매시 할인</Div> : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              process.env.PUBLIC_URL + "/img/shoes" + (Number(id) + 1) + ".jpg"
            }
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{sh.title}</h4>
          <p>{sh.content}</p>
          <p>{sh.price}</p>
          <Btn bg="black">주문하기</Btn>
        </div>
      </div>
    </div>
  );
}
export default Detail;
