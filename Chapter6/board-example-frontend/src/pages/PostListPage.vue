<template>
    <div class="post-list-page">
        <h1>포스트 게시글</h1>
        <!-- 자식 컴포넌트 props를 통해 posts 데이터를 내려준다. -->
        <post-list :posts="posts"/>
    </div>
</template>

<script>
import PostList from '@/components/PostList';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'PostListPage',
    components: { PostList },
    computed: {
        ...mapState([ 'posts' ])
    },
    created() {
        this.fetchPostList();
    },
    methods: {
        ...mapActions(['fetchPostList'])
    }
}
</script>