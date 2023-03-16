import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "./../store/userSlice";

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {state.stock.map((a, i) => (
          <tr key={i}>
            <td>{state.stock[i].id}</td>
            <td>{state.stock[i].name}</td>
            <td>{state.stock[i].count}</td>
            <td>안녕</td>
            <td>
              <button
                onClick={() => {
                  dispatch(changeName());
                }}
              >
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default Cart;
