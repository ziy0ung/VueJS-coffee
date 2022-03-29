// 액션 내 fatchMemos 함수에서 호출한 commit 메소드의 첫 번째 인자로 넣은 값과 변이의 이름이 일치하는 것을 확인할 수 있다. 
// 이러한 변이 이름 상수는 한 곳에서 통합적으로 관리하기 위해 별도의 파일을 만들어 관리하는 것이 좋다. 

// 이렇게 mutations-types.js라는 하나의 파일에서 스토어 내의 변이 이름을 관리하면 스토어를 파악하기 위해 스토어 전체를 보지 않더라도 mutations-types.js 파일만 열어보면 대략적인 스토어의 역할을 파악하기가 쉬워진다.

export const FETCH_MEMOS = 'FETCH_MEMOS';
export const ADD_MEMO = 'ADD_MEMO';
export const DELETE_MEMO = 'DELETE_MEMO';