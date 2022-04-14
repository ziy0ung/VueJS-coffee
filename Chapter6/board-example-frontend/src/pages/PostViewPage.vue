<template>
    <div class="post-view-page">
        <div class="post-view">
            <post-view v-if="post" :post="post"/>
            <p v-else>게시글 불러오는 중...</p>
            <router-link :to="{ name: 'PostEditPage', params: { postId } }">수정</router-link>
            <button @click="onDelete">삭제</button>
            <router-link :to="{ name: 'PostListPage' }">목록</router-link>
            <comment-list v-if="post" :comments="post.comments"/>
            <comment-form @submit="onCommentSubmit" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import PostView from '@/components/PostView';
import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';
import api from '@/api';

export default {
    name: 'PostViewPage',
    components: { PostView, CommentList, CommentForm },
    computed: {
        ...mapGetters([ 'isAuthorized' ]),
        ...mapState([ 'post' ])
    },
    methods: {
        // fetchPost 함수를 mapActions 헬퍼 함수를 컴포넌트 메소드에 매핑한다.
        ...mapActions([ 'fetchPost' ]),
        onDelete () {
            const { id } = this.post;
            api.delete(`/posts/${id}`)
                .then(res => {
                    alert('게시물이 성공적으로 삭제되었습니다.');
                    this.$router.push({ name: 'PostListPage' });
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        alert('로그인이 필요합니다.');
                        this.$router.push({ name: 'Signin' })
                    } else {
                        alert(err.response.data.msg)
                    }
                })
        },
        onCommentSubmit (comment) {
            if (!this.isAuthorized) {
                alert('로그인이 필요합니다!');
                this.$router.push({ name: 'Signin' });
            } else {
                this.createComment(comment)
                    .then(() => {
                        alert('댓글이 성공적으로 작성되었습니다.')
                    })
                    .catch(err => {
                        alert(err.response.data.msg);
                    })
            }
        },
        ...mapActions([
            'createComment'
        ])
    },
    props: {
        postId: {
            type: String, 
            required: true
        }
    },
    created () {
        this.fetchPost(`/${this.postId}`)
            .catch(err => {
                alert(err.response.data.msg);
                this.$router.back();
            })
    }
}
</script>