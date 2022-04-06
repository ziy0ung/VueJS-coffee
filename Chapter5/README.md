## 메모 관리 애플리케이션

### 목차

- 컴포넌트 구조
- 프로젝트 구성
- 헤더 컴포넌트 생성하기
- 메모 데이터 생성 기능 구현하기
- 메모 데이터 노출 기능 구현하기
- 메모 데이터 삭제 기능 구현하기
- 메모 데이터 수정 기능 구현하기
- 서버와 API 연동하기
  <br>

### 컴포넌트 구조화

App

> AppHeader <br>
> MemoApp : 메모들의 상태를 관리하는 컴포넌트
>
> > 📄 Memo : 각각의 메모의 상태를 표현할 수 있는 컴포넌트 <br>
> > 📄 MemoForm : 사용자의 메모를 입력받는 폼 컴포넌트
> > <br>

```
├─Chapter5
│  index.html
│  package.json
│  package-lock.json
│  webpack.config.js
│  .babelrc
│  .editorconfig
├─node_modules
├─store
└─src
   │  App.vue
   │  main.js
   ├─components
   │      AppHeader.vue
   │      Memo.vue
   │      MemoApp.vue
   │      MemoForm.vue
   ├─styles
   │      reset.css
   └─assets
          logo.png



```

#### 프로젝트 생성하기

```bash
vue init webpack-simple memo-application
```
