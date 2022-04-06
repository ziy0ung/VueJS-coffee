import { FETCH_POST_LIST } from './mutations-types'
import { FETCH_POST } from './mutations-types'
import { SET_ACCESS_TOKEN } from './mutations-types'
import { SET_MY_INFO } from './mutations-types'
import api from '@/api'
import Cookies from 'js-cookie'

export default {
    [FETCH_POST_LIST] (state, posts) {
        state.posts = posts
    },
    [FETCH_POST](state, post) {
        state.post = post
    },
    [SET_ACCESS_TOKEN](state, accessToken) {
        if (accessToken) {
            state.accessToken = accessToken;
            api.defaults.headers.common.Authorization = `Bearer${accessToken}`;
            Cookies.set('accessToken', accessToken)
        }
    },
    [SET_MY_INFO](state, me) {
        if (me) {
            state.me = me
        }
    }
}