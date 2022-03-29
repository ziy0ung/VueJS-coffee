<template>
  <div id="app">
    <app-header :memo-count="memoCount" />
    <memo-app @change="updateMemoCount" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MemoApp from './components/MemoApp';

export default {
  name: "App",
  components: { AppHeader, MemoApp },
  data() {
    return {
      memoCount: 0,
    };
  },
  methods: {
    // MemoApp에서 change 이벤트가 발생되면 updateMemoCount가 실행된다.
    updateMemoCount (count) {
      this.memoCount = count;
    }
  } 
};
</script>

<style>
@import "./styles/reset.css";

#app {
  width: 560px;
  margin: 0 auto;
}
</style>
