<template>
    <div class="memo-app">
        <!-- <memo-form v-on:addMemo="addMemo"/>와 같은 의미이다.  -->
        <memo-form @addMemo="addMemo"/>
        <!-- <memo /> -->
    </div>
</template>
<script>
import MemoForm from './MemoForm.vue';
//import Memo from './Memo';

export default {
    name: 'MemoApp',
    components: {
        MemoForm,
    },
    data() {
        return {
            memos: [],
        };
    },
    created() {
        this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
    },
    methods: {
        addMemo (payload) {
            // MemoForm에서 올려 받은 데이터를 먼저 컴포넌트 내부 데이터에 추가한다.
            this.memos.push(payload);
            // 내부 데이터를 문자열로 변환 후, 로컬 스토리지에 저장한다. 
            this.storeMemo();
        },
        storeMemo () {
            const memosToString = JSON.stringify(this.memos);
            localStorage.setItem('memos', memosToString);
        }
    },
}
</script>