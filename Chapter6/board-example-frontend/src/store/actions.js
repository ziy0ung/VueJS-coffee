import api from '@/api'
import { FETCH_POST_LIST } from './mutations-types'
import { FETCH_POST } from './mutations-types'
import { SET_ACCESS_TOKEN } from './mutations-types'
import { SET_MY_INFO } from './mutations-types'

export default {
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
        const { email, password } = payload
        return api.post('/auth/signin', { email, password })
            .then(res => {
                const { accessToken } = res.data;
                commit(SET_ACCESS_TOKEN, accessToken)

                return api.get('/users/me')
            }).then(res => {
                commit(SET_MY_INFO, res.data)
            })
    },
    signinByToken({ commit }, token) {
        commit(SET_ACCESS_TOKEN, token)
        return api.get('/users/me')
            .then(res => {
                commit(SET_MY_INFO, res.data)
            })
    }
}