# 알면 좋을 자바스크립트

## index

[1. Truthy 값과 Falsy 값](#truthy-값과-falsy-값)

## 1. Truthy 값과 Falsy 값

```javascript
function isValid(string) {
  return !!string;
}

isValid(""); // false
isValid("valid text"); // true
```
