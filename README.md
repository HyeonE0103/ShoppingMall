[코딩애플 온라인 React 강좌](https://codingapple.com/)

# 쇼핑몰 프로젝트

## 이미지 넣는 법

### CSS 안에서

CSS파일에서 src 폴더 안에 있는 사진을 사용하고 싶다면 ./이미지경로

```css
.image-bg {
  height: 300px;
  background-image: url("./bg.png");
}
```

### Html 안에서

Html 안에서 src 폴더의 이미지를 넣으려면 이미지를 import 한 뒤 사용

```js
import bg from "./bg.png";

function App() {
  return (
    <div>
      <div
        className="main-bg"
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div>
    </div>
  );
}
```

1. import 작명 from './이미지경로'
2. 이미지경로가 필요한 곳에서 작명한걸 사용하면 됨

< img > 태그로 쓴다면 < img src={bg}/ > 이렇게 써도 보임

## public 폴더

여러가지 소스코드는 src 폴더에 보관  
이미지 같은 static 파일의 경우 public 폴더에 보관해도 됨

리액트로 개발을 끝내면 build 작업을 하는데 지금까지 짰던 코드를 한 파일로 압축해주는 작업  
src 폴더에 있던 코드와 파일은 다 압축이 되는데 public 폴더에 있는 것들은 그대로 보존해줌

그래서 형태를 보존하고 싶은 파일은 public 폴더에 넣으면 되는데 js 파일은 보존할 일이 거의 없고  
이미지, txt, json 등 수정이 필요없는 static 파일들의 경우엔 public 폴더에 보관해도 상관없음

### public 폴더에 있는 이미지 사용

```js
<img src="/logo.png" />
```

/이미지경로 사용하면 됨  
import를 안해도 되어 편리. css 파일에서도 /이미지경로 사용하면 됨

```js
<img src={process.env.PUBLIC_URL + "/logo.png"} />
```

권장되는 방식

하위 경로로 배포할 경우 파일을 찾을 수 없다고 나올 수 있기에  
하위 경로를 뜻하는 process.env.PUBLIC_URL을 더해주는 것

하위 경로에 리액트로 만든 페이지를 배포할 일이 없다면 안해주어도 됨

## export, import

### export default, import

```js
//data.js

let a = 10;
export default a;
```

export default 변수명; 원하는 변수를 밖으로 내보낼 수 있음

```js
//App.js 파일

import a from "./data.js";
console.log(a);
```

export 했던 변수를 다른 파일에서 사용하고 싶으면 import 작명 from './파일경로'

- 변수, 함수, 자료형 전부 export 가능
- 파일마다 export default 라는 키워드는 하나만 사용가능
- 파일경로는 ./ 부터 시작해야 함(현재경로라는 뜻)

### export{ }, import{ }

```js
//data.js 파일

let a = 10;
let b = 20;
export { a, b };
```

여러개의 변수나 함수 등을 내보내고 싶으면 export { 변수1, 변수2 , ... }

```js
//App.js 파일

import { a, b } from "./data.js";
```

export{ }로 내보냈으면 가져다가 쓸 때 import{ } from ./파일경로 를 씀

- export { }로 내보냈다면 import { } 쓸 때 자유작명이 불가능함(export 했던 변수명 그대로 적어야됨)

## 리액트 라우터
페이지를 나누고 싶으면 일반 Html, CSS, JS 사이트는 Html 파일 여러개 만들면  
각각 하나의 페이지이지만 리액트는 Html 파일을 하나만 사용함  

그래서 리액트에서는 다른 페이지를 요청하면 내부에 있는 < div >를 변경하여 보여주게 됨  
→ 직접 코드를 짜는 것보다는 react-router-dom 이라는 외부 라이브러리 설치해서 구현하는게 일반적

### react-router-dom 설치

```js
npm install react-router-dom@6
```
터미널을 열어서 입력

```js
//index.js
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
```

셋팅은 index.js 파일에서 import 해온 뒤 < BrowserRouter >으로 < App />을 감싸면 됨

### 라우터 페이지 나누기

```js
//App.js
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path="/" element={<div>메인페이지</div>} />
         <Route path="/detail" element={<div>상세페이지</div>} />
      </Routes>
  )
}
```
1. 우선 상단에서 여러가지 컴포넌트를 import
2. < Routes > 만들고 그 안에 < Route >를 작성
3. < Route path="/url경로" element={ <보여줄html> } /> 작성

Route는 페이지라고 생각하면 됨(페이지가 4개 필요하면 Route가 4개인 것)  
경로에 /하나만 썼다면 메인페이지를 의미

### 페이지 이동 버튼
사용자들은 주소창에 url 입력해서 들어가지 않고 링크타고 들어감  

```js
<Link to="/">홈</Link>
<Link to="/detail">상세페이지</Link>
```
react-router-dom에서 Link 컴포넌트 import 해오고 원하는 곳에서 < Link > 쓰면 됨  
각각 url 경로로 이동하는 링크를 생성할 수 있음

### useNavigate()
페이지 이동은 Link를 써도 되지만 useNavigate()를 써도 됨

```js
function App(){
  let navigate = useNavigate()
  return (
    <button onClick={()=>{ navigate('/detail') }}>이동버튼</button>
  )
}
```

useNavigate() 쓰면 그 자리에 페이지 이동시켜주는 함수가 남음  

숫자넣으면 앞으로가기, 뒤로가기 기능개발도 가능함  
-1 넣으면 뒤로 1번 가기, 2 넣으면 앞으로 2번 가기 기능

### 404페이지
HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 여부를 나타냄  
그 중 없는 페이지일 때 나타내는 번호가 바로 404  

사용자가 이상한 경로로 접속했을 때 "없는 페이지임" 알려주는 페이지를 보여주고 싶다면

```js
<Route path="*" element={ <div>없는페이지</div> } />
```

< Route path= " * " > 를 맨 밑에 만들어두면 됨  
'*' 경로는 모든 경로를 뜻해서 이상한 페이지 접속시 * 경로로 안내해줌 

### 서브경로 만들 수 있는 nested routes

```js
<Route path="/about" element={ <About/> } >  
  <Route path="member" element={ <div>멤버</div> } />
  <Route path="location" element={ <div>회사위치</div> } />
</Route>
```
< Route >안에 < Route >를 넣을 수 있는데 이걸 Nested routes 라고 부름  

/about/member로 접속시 < About >과 < div >멤버< div/>을,  
/about/location으로 접속시 < About >과 < div >회사위치< div/>을 보여줌

다만 이렇게만 코드를 짜면 < div >가 보이지 않는데  
이유는 < About > 안에 < div >를 어디에다가 보여줄 것인지 표기를 해주어야 함

```js
function About(){
  return (
    <div>
      <h4>about페이지</h4>
      <Outlet></Outlet>
    </div>
  )
}
```
< Outlet >은 nested routes안의 element들을 어디에 보여줄지 표기하는 곳  
서브경로로 접속시 < Outlet >자리에 해당되는 < div >가 잘 보임

## 여러개의 상세페이지 만들기

```js
<Route path="/detail/:id" element={ <Detail shoes={shoes}/> }/>
```
여러개의 상세페이지를 만들때 하나하나 Route를 쓸수도 있지만 간편하게 만들기 위해  
페이지를 여러개 만들고 싶으면 URL 파라미터 문법을 사용 

path 작명할 때 /:변수를 사용하면 "아무 문자"를 뜻함  
그래서 위의 < Route >는 누군가 주소창에 /detail/아무문자 입력했을 때 < Detail > 컴포넌트 보여달라는 뜻  

```js
function Detail(props) {
  let { id } = useParams();
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
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
```
useParams() 라는 함수를 상단에서 import 해오면  
현재 /:url파라미터 자리에 유저가 입력한 값을 가져와 사용할 수 있음  

이런식으로 URL 파라미터를 이용하여 각기 다른 내용을 보여줄 수 있음  
path 작명시 url 파라미터는 몇번이고 사용가능함(detail/:무언가1/:무언가2)

## styled-components

### 설치

```js
npm install styled-components
```

터미널을 켜서 입력하여 설치

### styled-components 사용

```js
import styled from 'styled-components'
```

사용하고 싶은 파일 컴포넌트 상단에 import하여 사용

```js
import styled from 'styled-components';

let YellowBtn = styled.button`
  color : yellow;
`;

function Box(){
  return (
    <div>
        <YellowBtn>버튼</YellowBtn>
    </div>
  )
}
```

1. 태그를 만들고 싶으면 styled.태그명으로 사용하면 됨
2. 오른쪽에 `` backtick 기호를 이용해서 CSS 스타일을 넣을 수 있음
3. 그럼 그 자리에 컴포넌트를 남겨주는데 변수에 저장해서 쓰면 됨

```js
let YellowBtn = styled.button`
  color : yellow;
  padding : 10px;
`;

let NewBtn = styled.button(YellowBtn)`
  color : blue;
```

기존 스타일 복사 가능  
복사해 만든 스타일 커스터마이징 가능

```js
import styled from 'styled-components';

let YellowBtn = styled.button`
  background : ${ props => props.bg };
`;

function Detail(){
  return (
    <div>
        <YellowBtn bg="orange">오렌지 버튼</YellowBtn>
    </div>
  )
}
```

`${ props => props.변수명 }`을 사용해서 컴포넌트에 변수를 props로 입력가능

### styled-components 장점

- CSS 파일 오픈할 필요없이 JS 파일에서 바로 스타일을 넣을 수 있음
- 한 파일에 적은 스타일이 다른 JS 파일로 오염되지 않음(CSS파일은 오염됨).
- 페이지 로딩시간 단축됨(적은 스타일은 html 페이지의 <style>태그에 넣어주기 때문)

### styled-components 단점

- JS 파일이 매우 복잡해짐  
  컴포넌트가 styled 인지 아니면 일반 컴포넌트인지 구분이 어려워짐
- JS 파일 간 중복 디자인이 많이 필요한 경우  
  다른 파일에서 스타일 넣은 것들 import 해와서 쓰면 되지만 CSS파일과의 차이가 없어짐
- CSS 담당하는 디자이너가 있다면 협업시 불편  
  디자이너가 styled-components 문법을 모른다면 디자이너가 CSS로 짠 걸 styled-components 문법으로 다시 바꾸는 작업 필요

## Lifecycle과 useEffect
  
### Lifecyle
  
컴포넌트는 Lifecycle이라는 개념이 있음  
1. 생성이 되고(mount)
2. 재렌더링이 될수도 있고(update)
3. 삭제가 될 수 있음(unmount)
  
### Lifecycle hook
  
이런 Lifecycle 개념을 이용하여 컴포넌트에 중간중간 간섭을 할 수 있음  
주기에 갈고리에 코드를 달아주는 것으로 간섭할 수 있는 것  
이것을 Lifecycle hook이라고 부름  
  
useEffect에서 import 해오고 콜백함수를 추가해서 안에 코드를 적으면 컴포넌트가 mount & update시 실행됨
  
```js
import {useState, useEffect} from 'react';

function Detail(){
  useEffect(()=>{
    console.log('안녕')
  }); 
  return (생략)
}
```

### useEffect를 사용하는 이유

useEffect를 사용하는 이유는 안에 적은 코드는 html 렌더링 이후에 동작하기 때문인데  
이러한 점을 이용하여 Html 렌더링이 더 빠른 사이트를 원한다면 쓸데없는 것은 useEffect 안으로 넣는 것이 좋음

### useEffect에 넣을 수 있는 실행조건

```js
useEffect(()=>{ 실행할코드 }, [변수])
```
useEffect()의 둘째 파라미터로 [ ] 를 넣을 수 있는데 변수나 state같은 것들을 넣을 수 있음  
[ ]에 있는 변수나 state 가 변할 때만 useEffect 안의 코드를 실행해줌  
위에 예시는 변수가 변할 때만 useEffect 안의 코드가 실행됨  
아무것도 넣지 않는다면 컴포넌트 생성(mount)시 1회 실행하고 영영 실행해주지 않음  

### clean up function

구성 요소가 마운트 해제되기 전에 코드를 정리할 수 있는 Hook의 useEffect 기능  
코드가 실행되고 모든 렌더링에 대해 다시 실행될 때 cleanup 함수를 사용하여 자체적으로 정리함  
정리하는 이유는 개발자가 원하지 않는 동작을 방지하고 애플리게이션 성능을 최적화하는 효과를 주기 때문  

```js
useEffect(()=>{
  효과
  return ()=>{
    정리
  }
}, [입력])
```
useEffect 동작하기 전에 특정코드를 실행하고 싶으면 return ()=>{ } 안에 넣을 수 있음  

```js
useEffect(()=>{ 
  그 다음 실행됨 
  return ()=>{
    먼저 실행됨
  }
}, [])
```
그럼 useEffect 안에 있는 코드를 실행하기 전에 return ()=>{ } 안에 있는 코드를 실행해줌  

## 서버와 통신

### AJAX

AJAX는 서버에 GET, POST 요청을 할 때 새로고침 없이 데이터를 주고받을 수 있게 도와주는 브라우저 기능

### AJAX로 GET/POST 요청하는 법

- XMLHttpRequest라는 옛날 문법 사용
- fetch() 라는 최신 문법 사용
- axios 같은 외부 라이브러리 사용

### axios를 이용하여 GET 요청

터미널을 열어서

```js
npm install axios
```
을 입력하고 설치

```js
axios
  .get(URL)
  .then((변수) => {
	코드
  })
  .catch(() => {
    실패했을때 실행할 코드
  });
```

1. axios를 쓰려면 상단에 import
2. axios.get(URL)으로 자신이 원하는 URL로 GET요청
3. 데이터 가져온 결과는 변수.data 안에 들어가있음  
  - GET 요청의 결과는 변수에 들어가 있음  
  - 데이터만 사용하고 싶으면 변수.data  

4. 인요청에 실패했을 때 실행할 코드는 .catch() 안에 적기  

동시에 여러개 요청을 원한다면

```js
Promise.all( [axios.get('URL1'), axios.get('URL2')] )
```

여러개 완료시 특정 코드를 실행하고 싶으면 .then()을 붙이면 됨

### axios를 이용하여 POST 요청

```js
axios.post('URL', 데이터)
```
서버로 원하는 데이터 자료가 전송됨
완료시 특정 코드를 실행하고 싶으면 .then()을 뒤에 붙이면 됨

## 탭 UI 만들기

버튼 n개와 박스 n개를 미리 만들어놓고 버튼을 누를 때 마다 그에 맞는 박스를 보여주는 UI  

### 탭 UI 만들기
1. Html, CSS로 탭 디자인 미리 완성
2. UI의 현재 상태를 저장할 state 하나 만들기
3. state에 따라서 UI가 어떻게 보일지 작성

## 컴포넌트 애니메이션

1. 애니메이션 동작 전 스타일을 담을 className 만들기
2. 애니메이션 동작 후 스타일을 담을 className 만들기
3. transition 속성도 추가
4. 원할 때 동작 후 스타일을 담을 className 탈부착

#### automatic batching
React 18부터 automatic batching라는 기능이 생겼음  
Batching이란 React가 나은 성능을 위해 여러개의 state 업데이트를 한번의 리렌더링으로 묶어서 진행하는 것을 말함  
Batching으로 작업 렌더링을 최소화하여, 애플리케이션의 성능향상을 기대할수 있지만  
위에 애니메이션처럼 속성 탈부착에 시간차가 필요하다고 생각하는 등에  
Batching을 원치 않을경우에는 FlushSync을 사용하거나 자신의 코드에 맞게 setTimeout을 이용하면 됨  

## Redux
Redux는 props 없이 state를 공유할 수 있게 도와주는 라이브러리  
js 파일 하나에 state들을 보관할 수 있는데 state들을 모든 컴포넌트가 직접 꺼내쓸 수 있음  
props 전송이 필요없어짐

### Redux 설치

터미널에  
```js
npm install @reduxjs/toolkit react-redux
```
을 입력하여 설치(react, react-dom 18.1.x 이상이어야 함)

### Redux 셋팅

#### 1. store.js 파일을 만들어서 지정된 코드 작성

```js
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: { }
})
``` 
store.js 파일을 만들어서 위예 코드를 작성함  
store.js 파일은 state들을 보관하는 파일  

 
#### 2. index.js 파일에서 Provider 라는 컴포넌트와 아까 작성한 파일을 import 해온 후 감싸줌

```js
import { Provider } from "react-redux";
import store from './store.js'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
```

index.js 파일에서 Provider 라는 컴포넌트와 아까 작성한 파일을 import 해옴  
그리고 < Provider store={store}>로 < App/> 을 감싸면 됨  
store={store}로 하였는데 import로 받아온것을 store이라는 변수에 넣었기 때문  
→ 다른것으로 했다면 다른것을 넣으면 됨 store={import로 해온것 받아온 변수}  

그럼 이제 < App>과 그 모든 자식컴포넌트들은 store.js에 있던 state를 맘대로 꺼내쓸 수 있음

### Redux store에 state 보관하는 법 
```js
import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : 'Lee'
})

let item = createSlice({
  name : 'item',
  initialState : ['A', 'B', 'C']
})


export default configureStore({
  reducer: {
    user : user.reducer,
    item : item.reducer,
  }
})
```
#### 1. createSlice( ) 로 state 만들기  
createSlice( )를 상단에서 import 해온 다음에  
{ name : 'state이름', initialState : 'state값' }으로 state 하나 생성  

#### 2. configureStore( ) 안에 등록  
configureStore( )를 상단에서 import 해온 다음에  
{ 작명 : createSlice만든state.reducer }로 configureStore안에 등록  

### Redux store에 있던 state 사용

```js
import { useSelector } from "react-redux"

function Cart(){
  let a = useSelector((state) => { return state } )
}
```
컴포넌트에서 useSelector((state) => { return state } ) 쓰면 store에 있던 모든 state가 그 자리에 남음  

```js
let a = useSelector((state) => state.user )
```
원하는 state만 가져다 사용가능

### Redux store의 state변경
Redux의 state변경은 state의 수정해주는 함수를 만들고 원할 때 그 함수 실행해달라고 요청하는 방식  

#### 1. store.js에 state변경해주는 함수 만들기

```js
let user = createSlice({
  name : 'user',
  initialState : 'Lee',
  reducers : {
    changeName(state){
      return 'john ' + state
    }
  }
  ```
store.js slice 안에 reducers : { } 열고 거기 안에 함수 만들면 됨  
- 함수 작명은 원하는대로
- 파라미터 하나 작명하면 그것은 기존 state가 됨
- return 우측에 새로운 state 입력하면 그것으로 기존 state를 변경해줌

#### 2. export 하기

```js
export let { 함수1, 함수2, ... } = user.actions
```
store.js에 slice이름.actions 라고 적으면 state 변경함수가 전부 그 자리에 출력됨  
오른쪽에 있는 자료를 변수에 저장했다가 export 하라는 뜻  

#### 3.필요할 때 import 하여 dispatch() 로 감싸서 사용

```js
import { useDispatch, useSelector } from "react-redux"
import { changeName } from "./../store.js"

<button onClick={()=>{
  dispatch(changeName())
}}>+</button>
```
store.js에서 원하는 state변경함수 import해서 가져옴  
useDispatch를 라이브러리에서 import로 가져옴  
dispatch( state변경함수() )로 state변경함수()를 dispatch()에 감싸서 실행

## localStoage
새로고침을 하면 브라우저는 Html, CSS, JS 파일들을 처음부터 다시 읽기 때문에 모든 state 데이터는 리셋됨  
서버나 DB 지식이 없다면 localStorage를 이용해도 됨  
Local Storage는 브라우저를 청소하지 않는 이상 반영구적으로 Session Storage는 브라우저를 끄면 삭제됨  


### localStorage문법
```js
localStorage.setItem('데이터이름', '데이터');
localStorage.getItem('데이터이름');
localStorage.removeItem('데이터이름')
```
- setItem(추가)
- getItem(읽기)
- removeItem (삭제)

seesionStorage를 이용하기 원할경우 localStorage를 seesionStorage변경하여 입력  

#### localStorage에 array/object 자료 저장
```js
localStorage.setItem('obj', JSON.stringify({name:'Lee'}) );
```
localStorage는 문자만 저장할 수 있는 공간이라 array/object를 저장할 수는 없음  
그래서 문자취급을 받는 JSON을 이용해 localStorage에 저장  
array/object를 JSON으로 변환하고 싶으면 JSON.stringify()  

```js
let a = localStorage.getItem('obj');
let b = JSON.parse(a)
```
데이터를 읽어오면 JSON이 나오기때문에 원래 array/object로 변환하고 싶으면 JSON.parse()

## React.lazy()와 Suspanse
리액트 코드를 완성하면 npm run build 입력해서 코드들을 Html, CSS, JS파일로 변환해야함  
리액트로 만드는 Single Page Application의 특징은 Html, JS파일이 하나만 생성됨  
그래서 리액트 사이트들은 첫 페이지 로딩속도가 매우 느릴 수 있음  
이런경우 JS파일을 잘게 쪼개면 로딩속도를 향상 시킬 수 있음  

```js
import {lazy, Suspense, useEffect, useState} from 'react'

const Detail = lazy( () => import('./routes/Detail.js') )
const Cart = lazy( () => import('./routes/Cart.js') )
```
lazy를 import해오라고 바꾸면 lazy문법으로 해놓은 컴포넌트들은 컴포넌트가 필요해질때 import해오라는 뜻이 되어  
컴포넌트 내용을 다른 JS파일로 쪼개줌으로 첫 페이지 로딩속도를 향상시킬 수 있음  

```js
<Suspense fallback={ <div>Loading...</div> }>
  <Detail shoes={shoes} />
</Suspense>
```
lazy 사용하면 컴포넌트 로드까지 지연시간이 발생할 수 있음  
Suspanse를 import 해온뒤 컴포넌트를 감싸면 컴포넌트가 로딩중일 때 대신하여 보여줄  Html 작성도 가능함  
Suspanse 컴포넌트는 lazy컴포넌트를 감싸는데 하나의 Suspanse컴포넌트로 여러 lazy를 감쌀 수 있음  
lazy컴포넌트는 Suspanse컴포넌트 하위에서 렌더링되어야 함  

```js
return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element=<About/>} />
      </Routes>
    </Suspense>
);
```
React 공식문서에 따르면, Router 바로 아래에 Suspanse를 위치시키고 Route로 보여줄 컴포넌트들을 React.lazy로 불러오는 것을 권장함

## memo와 useMemo

### memo
컴포넌트가 재렌더링되면 안에 있는 자식컴포넌트는 항상 함께 재렌더링됨  
이런경우 자식컴포넌트가 무겁다면 부모컴포넌트가 재렌더링될 시 렌더링시간이 긴 문제가 될 수 있음  

#### memo 사용

```js
import {memo, useState} from 'react'

let Child = memo( function(){
  console.log('재렌더링됨')
  return <div>Child</div>
})

function Cart(){ 
  let [count, setCount] = useState(0)
  return (
    <Child />
    <button onClick={()=>{ setCount(count+1) }}> + </button>
  )
}
```
1. 상단에 memo를 import
2. 원하는 컴포넌트 정의부분을 감싸기  

컴포넌트를 감쌀때는 let 컴포넌트명 memo(function(){}) 식으로 만들어서 memo 감싸기  

memo는 헛된 재렌더링을 안시키기 위해 기존 props와 바뀐 props를 비교하는 연산이 추가로 진행됨  
props가 크고 복잡할 경우 부담이 될 수도 있기에 꼭 필요한 곳에만 사용  

#### useMemo

```js
import {useMemo, useState} from 'react'

function 함수(){
  return 결과
}
function Cart(){ 
  let result = useMemo(()=>{ return 함수() }, [])
  return (
	<div></div>
  )
}
```
useMemo는 처음에 계산된 결과값을 메모리에 저장해서 컴포넌트가 반복적으로 렌더링 되어도 계속 함수를 다시 호출하지 않고  
이전에 이미 계산된 결과 값을 메모리에서 꺼내와서 재사용할 수 있게 해줌  
그렇기에 재렌더링마다 동작을 안하기 때문에 효율적으로 동작함  

useMemo는 첫번째 인자로 콜백 함수를, 두번째 인자로 의존성 배열을 받음  
두번째 인자인배열의 요소 값이 업데이트될 때만 콜백 함수를 다시 호출해서 memoization된 값을 업데이트 해주어 다시 memoization을 해줌  
빈 배열([ ])을 넘겨주면 맨 처음 컴포넌트가 마운트 되었을 때만 값을 계산하고 이후에는 항상 memoization된 값을 꺼내와서 사용  

useMemo는 값을 재활용하기 위해 따로 메모리를 소비해서 저장을 해놓음  
그렇기에 불필요한 값을 모두 memoization해버릴 경우 성능이 않좋아 질수 있기 때문에 필요할때만 사용

## useTransition과 useDeferredValue

렌더링 시간이 오래 걸리는 컴포넌트가 있는데 특정반응(타이핑, 클릭 등)에 렌더링해야한다면 특정반응속도가 느려짐  
이럴경우 컴포넌트에 Html 갯수를 줄이면 대부분 해결되지만 안된다면 반응속도를 올리는 다른 방법을 생각해야함  

### useTransition
 ```js
import {useState, useTransition} from 'react'
let a = new Array(100).fill(0)
function App(){
  let [name, setName] = useState('')
  let [isPending, startTransition] = useTransition()
  return (
    <div>
      <input onChange={ (e)=>{ 
        startTransition(()=>{
          setName(e.target.value) 
        })
      }}/>
      {
        a.map(()=>{
          return <div>{name}</div>
        })
      }
    </div>
  )
}
 ```
useTransition() 쓰면 그 자리에 [변수, 함수]가 남음  
그 중 우측에 있는 startTransition() 함수로 state변경함수 같은걸 묶으면 그것을 다른 코드들보다 나중에 처리해줌  
그렇기에 특정반응에 반응속도가 훨씬 나아짐  
이것을 이용해 타이핑 같이 즉각적으로 반응해야하는것을 우선적으로 처리해줄 수 있음  
성능개선보다는 특정코드의 실행시점을 뒤로 옮겨주는 것이기 때문에 Html이 많다면 여러페이지로 쪼개는 것이 좋음  

### useDeferredValue
startTransition()과 용도가 같음  
다만 useDeferredValue는 state 아니면 변수하나를 집어넣을 수 있게 되어있음  
매개변수가 변동사항이 생길시 그것을 늦게 처리해줌  

 ```js
import {useState, useDeferredValue} from 'react'
let a = new Array(100).fill(0)
function App(){
  let [name, setName] = useState('')
  let state = useDeferredValue(name)
  return (
    <div>
      <input onChange={ (e)=>{ 
          setName(e.target.value) 
      }}/>

      {
        a.map(()=>{
          return <div>{state}</div>
        })
      }
    </div>
  )
}
```
위에 flushsync()의 예시와 같은 결과를 나타냄  
useDeferredValue 안에 state를 넣으면 state가 변동사항이 생겼을 때 나중에 처리해주고  
처리결과는 변수(여기서는 state)에 저장해줌