// actions.js : API 서버와의 통신을 통해 변이를 일으킬 액션 작성.
import api from '@/api';
import {
    FETCH_POST_LIST, FETCH_POST,
    SET_ACCESS_TOKEN, SET_MY_INFO
} from './mutations-types';

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
    },
    signin({ commit }, payload) {
        const { email, password } = payload;
        return api.post('/auth/signin', { email, password })
            .then(res => {
                const { accessToken } = res.data;
                commit(SET_ACCESS_TOKEN, accessToken);
                return api.get('/users/me');
            }).then(res => {
                commit(SET_MY_INFO, res.data)
            })
    },
    signinByToken({ commit }, token) {
        // 토큰을 스토어에 커밋한다.
        commit(SET_ACCESS_TOKEN, token);
        // 사용자의 정보를 받아온 후 스토어에 커밋한다.
        return api.get('/users/me')
            .then(res => {
                commit(SET_MY_INFO, res.data)
            })
    }
}