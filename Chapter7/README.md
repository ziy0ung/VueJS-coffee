# 알면 좋을 자바스크립트

## 목차

1. [Truthy 값과 Falsy 값](#1.truthy-값과-falsy-값)
2. [자바스크립트의 이벤트](#2.자바스크립트의-이벤트)
   2-1. [이벤트 전파 버블링]
   2-1. [이벤트 전파 버블링]

## 1.Truthy 값과 Falsy 값

```javascript
function isValid(string) {
  return !!string;
}

isValid(""); // false
isValid("valid text"); // true
```

### Truthy 값

- true
- 0보다 큰 숫자
- '0'과 같은 비어있지 않은 문자열
- []와 같은 빈 배열
- {}와 같은 빈 오브젝트
- function(){}와 같은 빈 함수

### Falsy 값

- false
- 숫자 0
- ''과 같은 빈 문자열
- null
- undefined
- NaN

## 2.자바스크립트의 이벤트

이벤트 리스너는 각 이벤트의 발생 여부를 감시한다. 이벤트 리스너가 이벤트의 발생을 감시하면 해당 이벤트에 대응하는 다음 동작을 이어갈 수 있는데, 이 동작을 수행하는 것이 이벤트 핸들러다.  
자바스크립트는 `dispatchEvent` 메소드로 이벤트를 발생시키고 `addEventListenrer`와 `on` 메소드를 통해 이벤트 리스너와 이벤트 핸들러는 자유롭게 등록할 수 있는 기능을 제공하고 있다. 마찬가지로 Vue도 역시 `$emit` 메소드로 이벤트를 발생시키고 `v-on` 디렉티브나 `$on`, `$once` 메소드를 통해 이벤트 리스너와 이벤트 핸들러를 등록할 수 있는 기능을 제공한다.

### 2.1이벤트 전파 버블링

자바스크립트는 어떤 요소에서 이벤트가 발생했을 때 해당 요소에서만 이벤트가 발생하는 것이 아니라 이벤트를 다른 요소로 전파(Propagation)하기도 한다. 이때 이벤트가 전파되는 순서가 하위 요소에서부터 상위 요소로 전파되기 때문에 마치 거품이 올라오는 모습과 흡사하다고 해서 '버블링'이라고 부른다.

```html
<div onclick="handler1()">
  <div onclick="handler2()">
    <button onclick="handler3()">클릭해주세요.</button>
  </div>
</div>

<script>
  function handler1() {
    console.log(1);
  }
  function handler2() {
    console.log(2);
  }
  function handler3() {
    console.log(3);
  }
</script>
```
