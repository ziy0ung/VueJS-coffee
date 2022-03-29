<template>
    <li class="memo-item">
        <strong>{{ memo.title }}</strong>
        <p @dblclick="handleDblClick">
            <template v-if="!isEditing">{{ memo.content }}</template>
            <!-- 키보드의 enter를 칠 경우, updateMemo 함수를 실행시켜준다.  -->
            <!-- @blur : 인풋 영역에서 다른 곳으로 커서를 옮기는 등의 행위를 통해 수정 중인 메모를 저장하지 않고 수정 모드를 종료할 수 있는 기능 -->
            <input v-else
                    type="text"
                    ref="content"
                    :value="memo.content"
                    @blur="handleBlur" 
                    @keydown.enter="updateMemo" />
        </p>
        <button type="button" @click="deleteMemo">
            <i class="fas fa-times"></i>
        </button>
    </li>
</template>

<script>
export default {
    name: 'Memo',
    // 부모에게 내려받은 props를 등록한다.
    data () {
        return {
            isEditing: false
        }
    },
    props: {
        memo: {
            type: Object
        }
    },
    methods: {
        deleteMemo () {
            const id = this.memo.id;
            this.$emit('deleteMemo', id);
        },
        handleDblClick () {
            this.isEditing = true;
            // 메모 수정용 인풋 영역이 활성화되면 활성화된 인풋 영역에 자동으로 포커스가 잡혀서 사용자가 바로 수정할 메모 내용을 입력할 수 있도록
            this.$nextTick(() => {
                this.$refs.content.focus();
            })
        },
        updateMemo (e) {
            const id = this.memo.id;
            const content = e.target.value.trim();
            if (content.length <= 0) {
                return false;
            }
            this.$emit('updateMemo', { id, content });
            this.isEditing = false;
        },
        handleBlur () {
            this.isEditing = false;
        }
    },


}
</script>

<style scoped>
.memo-item {
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    padding: 24px;
    box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    list-style: none;
}
.memo-item button {
    background: none;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    color: #e5e5e5;
    border: 0;
}
.memo-item strong {
    display: block;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: normal;
    word-break: break-all;
}
.memo-item p {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    color: #666;
}
.memo-item p input[type="text"] {
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    border: 1px solid #999;
}
</style>