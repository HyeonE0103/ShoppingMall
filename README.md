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
