import { memo, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increase, remove } from "./../store/stockSlice";

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  let [count, setCount] = useState(0);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>수량추가</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {state.stock.map((a, i) => (
            <tr key={i}>
              <td>{state.stock[i].id}</td>
              <td>{state.stock[i].name}</td>
              <td>{state.stock[i].count}</td>
              <td>
                <button onClick={() => dispatch(increase(state.stock[i].id))}>
                  +
                </button>
              </td>
              <td>
                <button onClick={() => dispatch(remove(state.stock[i].id))}>
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Child />
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

let Child = memo(function () {
  console.log("재렌더링됨");
  return <div>Child</div>;
});
export default Cart;
