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