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
