// actions.js : API 서버와의 통신을 통해 변이를 일으킬 액션 작성.
import api from '@/api';
import { FETCH_POST_LIST, FETCH_POST } from './mutations-types';

export default {

    // 서버로부터 게시물을 받아올 요청을 생성하도록 잠수를 작성한 후, 응답으로 내려온 게시물 데이터를 FETCH_POST_LIST 변이의 실행과 함께 인자로 넘겨준다.
    fetchPostList({ commit }) {
        return api.get('/posts')
            .then(res => {
                commit(FETCH_POST_LIST, res.data)
            })
    },
    fetchPost({ commit }, postId) {
        return api.get(`/posts/${postId}`)
            .then(res => {
                commit(FETCH_POST, res.data)
            })
    }
}