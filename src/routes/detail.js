import { useParams } from "react-router-dom";

function Detail(props) {
  let { id } = useParams();

  const sh = props.shoes.find((x) => {
    return x.id == id;
  });

  return (
    <div className="container">
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
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
export default Detail;
