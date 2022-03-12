<template>
  <div class="memo-app">
    <!-- <memo-form v-on:addMemo="addMemo"/>와 같은 의미이다.  -->
    <memo-form @addMemo="addMemo" />
    <ul class="memo-list">
      <memo
        v-for="memo in memos"
        :key="memo.id"
        :memo="memo"
        @deleteMemo="deleteMemo"
        @updateMemo="updateMemo"
      />
    </ul>
  </div>
</template>
<script>
import MemoForm from "./MemoForm.vue";
import Memo from "./Memo";
import axios from "axios";

const memoAPICore = axios.create({
  baseURL: "http://localhost:8000/api/memos"
});

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
    //this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
    // 앞서 생성된 Axios 객체의 get 메소드를 이용하여 데이터를 받아온다.
    memoAPICore.get("/").then(res => {
      this.memos = res.data;
    });
  },
  methods: {
    addMemo(payload) {
      // 1. axios 객체의 post 메소드를 이용하여 데이터를 추가한다.
      memoAPICore.post("/", payload).then(res => {
        // 2. 정상적인 메모를 생성 후, 결괏값을 memos에 추가한다.
        this.memos.push(res.data);
      });
    },
    storeMemo() {
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem("memos", memosToString);
    },
    deleteMemo(id) {
      // 1. 자식 컴포넌트에서 인자로 전달해주는 id에 해당하는 메모 데이터의 인덱스를 찾는다.
      const targetIndex = this.memos.findIndex(v => v.id === id);
      // 2. 찾은 인덱스 번호에 해당하는 메모 데이터를 삭제한다.
      this.memos.splice(targetIndex, 1);
      // 3. 삭제된 후의 데이터를 다시 로컬스토리지에 마찬가지로 저장한다.
      this.storeMemo();
    },
    updateMemo(payload) {
      // 1. 수정된 메모를 저장한다.
      const { id, content } = payload;
      const targetIndex = this.memos.findIndex(v => v.id === id);
      const targetMemo = this.memos[targetIndex];
      this.memos.splice(targetIndex, 1, { ...targetMemo, content });
      this.storeMemo();
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
