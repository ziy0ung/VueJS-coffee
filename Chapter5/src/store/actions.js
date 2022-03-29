import axios from 'axios';
import { FETCH_MEMOS, ADD_MEMO, DELETE_MEMO } from './mutations-types';

const memoAPICore = axios.create({
    baseURL: 'http://localhost:8000/api/memos'
})

export function fetchMemos({ commit }) {
    // MemoApp의 created 훅에서 실행되는 함수를 가져온다.
    memoAPICore.get('/')
        .then(res => {
            commit(FETCH_MEMOS, res.data);
        });
}

export default {
    fetchMemos,
    addMemo,
    deleteMemo
}

export function addMemo({ commit }, payload) {
    memoAPICore.post('/', payload)
        .then(res => {
            commit(ADD_MEMO, res.data)
        })    
}

export function deleteMemo({ commit }, id) {
    memoAPICore.delete(`/${id}`)
        .then(() => {
            commit(DELETE_MEMO, id);
        })
}
