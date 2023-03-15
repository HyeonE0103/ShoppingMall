import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function Cart() {
  let state = useSelector((state) => state);
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default Cart;
