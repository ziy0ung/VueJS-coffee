import api from '@/api'
import {
    FETCH_POST_LIST,
    FETCH_POST,
    SET_ACCESS_TOKEN,
    SET_MY_INFO
} from './mutations-types'

export default {
    fetchPostList({ commit }) {
        return api.get('/posts')
            .then(res => {
                // 받아온 게시물 데이터를 FETCH_POST_LIST 변이의 실행과 함께 인자로 넘겨준다.
                commit(FETCH_POST_LIST, res.data);
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
                commit(SET_ACCESS_TOKEN, accesToken)
                return api.get('/users/me');
            }).then(res => {
                commit(SET_MY_INFO, res.data)
            })
    },
    signinByToken({ commit }, token) {
        commit(SET_ACCESS_TOKEN, token);
        return api.get('/users/me')
            .then(res => {
                commit(SET_MY_INFO, res.data)
            })
    }
}