<template>
    <div class="comment-item">
        <strong>{{ comment.user.name}}</strong><span>{{ comment.createAt }}</span>
        <div v-if="isEditing">
            <textarea v-model="editMessage" row="3"></textarea>
            <button>수정완료</button>
        </div>
        <p v-else>{{ comment.contents }}</p>
        <ul v-if="isMyComment">
            <li><button type="button" @click="toggleEditMode">{{ editButtonText }}</button></li>
            <li><button type="button">삭제</button></li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'CommentItem',
    props: {
        comment: {
            type: Object,
            required: true,
            validator (comment) {
                const isValidCommentId = typeof comment.id === 'number';
                const isValidContents = comment.contents && comment.contents.length;
                const isValidUser = !!comment.user;
                return isValidCommentId && isValidContents && isValidUser;
            }
        }
    },
    data () {
        return {
            isEditing: false,
            editMessage: '',
        }
    },
    computed: {
        ...mapState([ 'me' ]),
        ...mapGetters([ 'isAuthorized' ]),
        isMyComment () {
            return this.isAuthorized && this.comment.user.id === this.me.id
        },
        editButtonText () {
            return this.isEditing ? '수정 취소' : '수정';
        },
        isValidComment () {
            return t
        }
    },
    methods: {
        toggleEditMode () {
            this.isEditing = !this.isEditing;
            if (this.isEditing) {
                this.editMessage = this.comment.contents;
            }
        }
    }
}
</script>