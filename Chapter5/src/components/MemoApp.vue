<template>
  <div class="memo-app">
    <!-- v-on 디렉티브를 이용하여 MemoForm 컴포넌트의 addMemo 이벤트로부터 데이터를 받아온다. -->
    <!-- @addMemo="addMemo"은 v-on:addMemo="addMemo"와 같은 의미이다. -->
    <memo-form @addMemo="addMemo"/>
    <ul class="memo-list">
      <memo v-for="memo in memos"
            :key="memo.id"
            :memo="memo"
            @deleteMemo="deleteMemo"
            @updateMemo="updateMemo" />
    </ul>
  </div>
</template>
<script>
import MemoForm from "./MemoForm";
import Memo from "./Memo";
import axios from 'axios';
import { mapActions, mapState } from 'vuex';

const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
})

export default {
  name: "MemoApp",
  components: {
    MemoForm,
    Memo
  },
  created() {
    this.fetchMemos();
  },
  computed: {
    ...mapState([
      'memos'
    ])
  },
  methods: {
    // 메모가 추가되든 삭제되든 메모 개수가 변동된다면 change이벤트를 호출한다. 
    addMemo () {
      const { title, content } = this;
      const isEmpty = title.length <= 0 || content.length <= 0;
      if (isEmpty) {
        return false;
      }
      this.$emit('addMemo', { title, content });
      this.resetFields();
    },
    updateMemo(payload){
      const { id, content } = payload;
      const targetIndex = this.memos.findIndex(v => v.id === id);
      const targetMemo = this.memos[targetIndex];
      memoAPICore.put(`/${id}`, { content })
        .then(() => {
          this.memos.splice(targetIndex, 1, { ...targetMemo, content });
        })
    },
    deleteMemo(id) {
      const targetIndex = this.memos.findIndex(v => v.id === id);
      // 1. 삭제 대상과 일치하는 id 값을 delete 메소드와 함께 요청한다. 
      memoAPICore.delete(`/${id}`)
        .then(() => {
          // 2. 요청 후, MemoApp 컴포넌트의 memos 데이터에서도 삭제한다. 
          this.memos.splice(targetIndex, 1);
        })

      // 찾은 인덱스 번호에 해당하는 메모 데이터를 삭제한다.
      this.memos.splice(targetIndex, 1);
      this.$emit('change', this.memos.length)

    },
    ...mapActions([
      'fetchMemos',
      'addMemo',
      'deleteMemo'
    ])

  }
};
</script>

<style scoped>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>
