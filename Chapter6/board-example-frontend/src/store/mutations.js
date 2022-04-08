// mutations.js : 우리가 추가한 스토어의 값을 변경할 수 있는 변이(mutations)

import { FETCH_POST_LIST, FETCH_POST } from './mutations-types';

export default {
    [FETCH_POST_LIST] (state, posts) {
        state.posts = posts;
    },
    [FETCH_POST](state, post) {
        state.post = post;
    }
}