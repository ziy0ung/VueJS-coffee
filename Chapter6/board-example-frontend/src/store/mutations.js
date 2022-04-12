// mutations.js : 우리가 추가한 스토어의 값을 변경할 수 있는 변이(mutations)

import {
    FETCH_POST_LIST, FETCH_POST,
    SET_ACCESS_TOKEN, SET_MY_INFO
} from './mutations-types';
import Cookies from 'js-cookie';

export default {
    [FETCH_POST_LIST] (state, posts) {
        state.posts = posts;
    },
    [FETCH_POST](state, post) {
        state.post = post;
    },
    [SET_ACCESS_TOKEN](state, accessToken) {
        // 토큰을 인자로 받아서 스토어 상태의 토큰을 업데이트하고, 
        // api 모듈을 사용하여 HTTP 헤더에 토큰을 심어준다.
        if (accessToken) {
            state.accessToken = accessToken;
            api.defaults.headers.common.Authorization = `Bearer${accessToken}`;
            Cookies.set('accessToken', accessToken);
        }
    },
    [SET_MY_INFO](state, me) {
        if (me) {
            state.me = me;
        }
    }
}