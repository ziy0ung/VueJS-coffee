<template>
    <li class="memo-item">
        <!-- 2. 등록된 props의 값을 각 DOM에 위치시킨다.  -->
        <strong>{{ memo.title }}</strong>
        <p @dblclick="handleDblClick">
            <template v-if="!isEditing">{{ memo.content }}</template>
            <input v-else
                type="text" 
                ref="content" 
                @blur="handleBlur"
                :value="memo.content"
                @keydown.enter="updateMemo"/>
        </p>
        <button type="button" @click="deleteMemo">
            <i class="fas fa-times"></i>
        </button>
    </li>
</template>

<script>
export default {
    name: 'Memo',
    // 1. 부모에게 내려받은 props를 등록한다.
    props: {
        memo: {
            type: Object
        }
    },
    data () {
        return {
            isEditing: false
        }
    },
    methods: {
        deleteMemo () {
            const id = this.memo.id;
            // 메모 데이터를 생성하는 기능을 담당하는 MemoForm 컴포넌트와 마찬가지로 Memo 컴포넌트는 직접적인 삭제를 하지 않고 부모 컴포넌트인 삭제의 책임을 위임하되, 인자로 ID 값을 전달해준다. 
            this.$emit('deleteMemo', id);
        },
        handleDblClick () {
            this.isEditing = true;
            // 메모 수정용 인풋 영역이 활성화되면 활성화된 인풋 영역에 자동으로 포커스가 잡혀서 사용자가 바로 수정할 메모 내용을 입력할 수 있도록 기능을 추가할 것이다. focus 이벤트를 추가한다. 
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
            this.$emit('updateMemo',{ id, content });
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