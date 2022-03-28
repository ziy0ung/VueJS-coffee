<template>
  <div class="memo-app">
    <!-- v-on 디렉티브를 이용하여 MemoForm 컴포넌트의 addMemo 이벤트로부터 데이터를 받아온다. -->
    <!-- @addMemo="addMemo"은 v-on:addMemo="addMemo"와 같은 의미이다. -->
    <memo-form @addMemo="addMemo"/>
    <ul class="memo-list">
      <memo v-for="memo in memos"
            :key="memo.id"
            :memo="memo"
            @deleteMemo="deleteMemo" />
    </ul>
  </div>
</template>
<script>
import MemoForm from "./MemoForm";
import Memo from "./Memo";

export default {
  name: "MemoApp",
  components: {
    MemoForm,
    Memo
  },
  data() {
    return {
      memos: []
    };
  },
  created() {
    this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
  },
  methods: {
    updateMemo(payload){
      // 수정된 메모를 저장한다.
      const { id, content } = payload;
      const targetIndex = this.memos.findIndex(v => v.id === id);
      const targetMemo = this.memos[targetIndex];
      this.memos.splice(targetIndex, 1, { ...targetMemo, content });
      this.storeMemo();
    },
    deleteMemo(id) {
      // 자식 컴포넌트에서 인자로 전달해주는 id에 해당하는 메모 데이터의 인덱스를 찾는다.
      const targetIndex = this.memos.findIndex(v => v.id === id);
      // 찾은 인덱스 번호에 해당하는 메모 데이터를 삭제한다.
      this.memos.splice(targetIndex, 1);
      // 삭제된 후의 데이터를 다시 로컬스토리지에 마찬가지로 저장한다.
      this.storeMemo();
    },
    addMemo (payload) {
      // MemoForm에서 올려 받은 데이터를 먼저 컴포넌트 내부 데이터에 추가한다. 
      this.memos.push(payload);
      // 내부 데이터를 문자열로 변환 후, 로컬 스토리지에 저장한다. 
      this.storeMemo();
    },
    storeMemo() {
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem('memos', memosToString);
    }
  

  }
};
</script>

<style scoped>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>
